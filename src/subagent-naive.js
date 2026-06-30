// ─────────────────────────────────────────────────────────────────────────────
// NAIVE SUBAGENT — the "before" picture.
//
// Anti-pattern being demonstrated: the subagent does NO local error handling.
// It calls the parser once; any exception terminates the subagent immediately
// and bubbles straight up to the coordinator, which then has to decide what to
// do (retry / skip / fail) for EVERY routine issue. This turns the coordinator
// into a bottleneck and a dumping ground for execution-level concerns.
// ─────────────────────────────────────────────────────────────────────────────

import { PdfParser } from "./pdf-parser.js";

export class NaiveDocumentSubagent {
  constructor(id = "naive-subagent") {
    this.id = id;
  }

  // Returns a result OR throws. Notice it offers the coordinator no context:
  // no partial results, no record of what was attempted.
  async process(document) {
    const parsed = await PdfParser.parseDocument(document);
    return {
      status: "success",
      documentId: document.id,
      extracted: parsed,
      warnings: [],
      attempts: [],
    };
  }
}
