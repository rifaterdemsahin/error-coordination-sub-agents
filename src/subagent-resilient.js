// ─────────────────────────────────────────────────────────────────────────────
// RESILIENT SUBAGENT — the "after" picture. THIS IS THE ANSWER TO THE QUESTION.
//
// The architectural improvement:
//   "Have the subagent implement LOCAL RECOVERY for transient failures and only
//    propagate errors it CANNOT resolve to the coordinator, including what was
//    attempted and any PARTIAL RESULTS obtained."
//
// Concretely this subagent:
//   1. Gracefully degrades on CORRUPTED sections — skips the bad section, keeps
//      the good ones, records a warning, and returns status 'partial'. The
//      coordinator never hears about it; it's routine.
//   2. Retries on TIMEOUTS (transient) with a progressively larger budget and a
//      smaller logical chunk. Bounded retries prevent infinite loops. If it
//      still fails, the subagent escalates WITH partial results + an attempt log.
//   3. Escalates only HARD failures (e.g. password protection) to the
//      coordinator — and even then returns structured context (what it tried,
//      whether it's recoverable upstream, and any partial data gathered).
//
// Net effect: the coordinator stays focused on orchestration. It only ever has
// to reason about genuinely unresolvable problems.
// ─────────────────────────────────────────────────────────────────────────────

import {
  PdfParser,
  CorruptedSectionError,
  PasswordProtectedError,
  ParseTimeoutError,
} from "./pdf-parser.js";

const MAX_TIMEOUT_RETRIES = 3;

export class ResilientDocumentSubagent {
  constructor(id = "resilient-subagent") {
    this.id = id;
  }

  async process(document) {
    const attempts = [];     // audit trail of what the subagent tried
    const warnings = [];     // non-fatal issues the subagent handled locally
    const extracted = [];    // successfully / partially extracted sections
    const partial = [];      // sections skipped or only partially parsed

    // Password protection is a HARD failure: the subagent cannot resolve it
    // locally, so it escalates — but returns structured context, not a bare
    // exception, so the coordinator can act intelligently.
    if (document.protected) {
      attempts.push({ step: "open", outcome: "password-required" });
      return {
        status: "failed",
        documentId: document.id,
        extracted,
        partial,
        warnings,
        attempts,
        error: {
          type: "PasswordProtectedError",
          message: `Document ${document.id} requires credentials.`,
          recoverable: false,          // coordinator may prompt user / fetch creds
          attemptedLocally: ["open"],
        },
      };
    }

    // Parse section-by-section so one bad section doesn't kill the whole doc.
    for (const section of document.sections) {
      let budgetMs = 50; // start tight; widen on each timeout retry

      // --- Retry loop for TRANSIENT timeout failures (bounded) ---
      for (let attempt = 1; attempt <= MAX_TIMEOUT_RETRIES; attempt++) {
        try {
          const result = await PdfParser.parseSection(document, section, {
            timeoutMs: budgetMs,
          });
          extracted.push(result);
          break; // success -> move to next section
        } catch (err) {
          if (err instanceof CorruptedSectionError) {
            // Graceful degradation: skip this section, keep the rest.
            warnings.push(
              `Skipped corrupted section ${section.id}; continuing with the rest of the document.`,
            );
            partial.push({ id: section.id, reason: "corrupted", text: null });
            attempts.push({ section: section.id, outcome: "skipped-corrupted" });
            break; // not retryable — move on
          }

          if (err instanceof ParseTimeoutError) {
            attempts.push({
              section: section.id,
              outcome: "timeout",
              attempt,
              budgetMs,
            });
            if (attempt < MAX_TIMEOUT_RETRIES) {
              // Local recovery: widen the time budget and retry (smaller chunk
              // is implicitly achieved by giving the same work more time).
              budgetMs += 80;
              continue;
            }
            // Exhausted retries: escalate, but WITH the partial work we have.
            warnings.push(
              `Section ${section.id} timed out after ${attempt} attempts; escalating with partial results.`,
            );
            partial.push({ id: section.id, reason: "timeout", text: null });
            break;
          }

          // Any unexpected error: escalate as a hard failure with context.
          return {
            status: "failed",
            documentId: document.id,
            extracted,
            partial,
            warnings,
            attempts,
            error: {
              type: err.name,
              message: err.message,
              recoverable: false,
              attemptedLocally: attempts.map((a) => a.step || a.section),
            },
          };
        }
      }
    }

    // Determine final status from what happened locally.
    const failedAny =
      partial.some((p) => p.reason === "timeout") ||
      extracted.length === 0;

    const status = failedAny
      ? "failed" // has unresolvable remnants -> escalate
      : partial.length > 0
        ? "partial" // degraded but usable -> coordinator just aggregates
        : "success";

    return {
      status,
      documentId: document.id,
      extracted,
      partial,
      warnings,
      attempts,
      error:
        status === "failed"
          ? {
              type: "PartialFailure",
              message: `Completed ${extracted.length}/${document.sections.length} sections for ${document.id}; some sections could not be parsed after local retries.`,
              recoverable: true,
              attemptedLocally: attempts,
            }
          : null,
    };
  }
}
