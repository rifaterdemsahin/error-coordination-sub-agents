// The coordinator orchestrates a research task over many documents by
// delegating each one to a subagent. The POINT of this demo is how little the
// coordinator has to do when its subagent is resilient.
//
// With a resilient subagent, the coordinator only branches on status ===
// "failed" (a genuinely unresolvable problem carrying structured context). The
// "success" and "partial" cases are just aggregation — no error triage needed.
//
// With a NAIVE subagent, the same coordinator is forced to catch exceptions and
// make retry/skip/fail decisions for every routine parsing hiccup. We expose a
// flag so the same coordinator can show both behaviours side by side.

export class Coordinator {
  constructor({ subagent, mode }) {
    this.subagent = subagent; // "naive" | "resilient"
    this.mode = mode;
    this.coordinatorInterventions = 0; // how often the coordinator had to triage
    this.log = [];
  }

  #record(line) {
    this.log.push(line);
    this.coordinatorInterventions += 1;
  }

  async runResearchTask(corpus) {
    const results = [];

    for (const document of corpus) {
      if (this.mode === "naive") {
        // The coordinator must wrap every delegation in try/catch and decide
        // what to do, because the naive subagent can throw at any moment.
        try {
          const result = await this.subagent.process(document);
          results.push(result);
        } catch (err) {
          this.#record(
            `⚠️  Coordinator triage for ${document.id}: caught ${err.name} -> SKIPPING document and moving on.`,
          );
          results.push({
            status: "failed",
            documentId: document.id,
            extracted: [],
            partial: [],
            warnings: [],
            attempts: [],
            error: { type: err.name, message: err.message, recoverable: err.recoverable ?? false },
          });
        }
      } else {
        // Resilient subagent returns a structured result; coordinator only
        // reacts to genuine escalations.
        const result = await this.subagent.process(document);
        if (result.status === "failed") {
          this.#record(
            `🔴 Coordinator received escalation for ${document.id}: ${result.error?.type} ` +
              `(recoverable=${result.error?.recoverable}). Deciding next step.`,
          );
        }
        results.push(result);
      }
    }

    return {
      results,
      coordinatorInterventions: this.coordinatorInterventions,
      log: this.log,
    };
  }
}
