// A SIMULATED PDF parsing library. It mirrors the failure behaviour of a real
// parser (corrupted sections, password protection, timeouts on large files)
// so the subagent's recovery logic can be demonstrated deterministically.
//
// `parseSection` throws typed errors so callers can branch on recoverability:
//   - CorruptedSectionError : transient / repairable (skip the section)
//   - PasswordProtectedError: hard / unresolvable locally (escalate)
//   - ParseTimeoutError     : transient / retryable (retry with smaller chunk)

export class CorruptedSectionError extends Error {
  constructor(sectionId) {
    super(`Section ${sectionId} is corrupted and could not be parsed.`);
    this.name = "CorruptedSectionError";
    this.sectionId = sectionId;
    this.recoverable = true;
  }
}

export class PasswordProtectedError extends Error {
  constructor(documentId) {
    super(`Document ${documentId} is password-protected; credentials required.`);
    this.name = "PasswordProtectedError";
    this.documentId = documentId;
    this.recoverable = false; // cannot be resolved locally by the subagent
  }
}

export class ParseTimeoutError extends Error {
  constructor(documentId) {
    super(`Parsing timed out on document ${documentId}.`);
    this.name = "ParseTimeoutError";
    this.documentId = documentId;
    this.recoverable = true; // retryable with a smaller chunk / longer budget
  }
}

export class PdfParser {
  // parseDocument is the "all or nothing" entry point a naive subagent would use.
  // It throws on the FIRST problem it encounters, terminating the whole parse.
  static async parseDocument(document) {
    if (document.protected) throw new PasswordProtectedError(document.id);

    for (const section of document.sections) {
      if (section.corrupted) throw new CorruptedSectionError(section.id);
      if (document.large) throw new ParseTimeoutError(document.id); // large -> blows the default budget
    }
    return { sections: document.sections.map((s) => ({ id: s.id, text: s.text })) };
  }

  // parseSection parses a single section with a configurable timeout budget.
  // Large files are slow; a tight budget will time out unless the caller widens it.
  static async parseSection(document, section, { timeoutMs = 50 } = {}) {
    if (document.protected) throw new PasswordProtectedError(document.id);

    if (section.corrupted) throw new CorruptedSectionError(section.id);

    // Simulate work. Large documents are slow enough to trip a small budget.
    const workMs = document.large ? 80 : 5;
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, workMs);
      const bomb = setTimeout(
        () => {
          clearTimeout(timer);
          reject(new ParseTimeoutError(document.id));
        },
        timeoutMs,
      );
      // Clean up the bomb once work completes.
      const originalResolve = resolve;
      resolve = (...args) => {
        clearTimeout(bomb);
        originalResolve(...args);
      };
    });

    return { id: section.id, text: section.text };
  }
}
