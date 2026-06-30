// A simulated PDF document. A PDF is modelled as an ordered list of "sections".
// Each section either parses cleanly or is "corrupted" (will throw when parsed).
//
// Failure modes encoded on the document:
//   - protected: true   -> the whole document is password-protected (HARD failure).
//   - large:     true   -> very large file, parsing is slow and may time out (TRANSIENT).
//   - sections[i].corrupted -> a single section is unreadable (TRANSIENT / repairable).

export class PdfSection {
  constructor(id, text, { corrupted = false } = {}) {
    this.id = id;
    this.text = text;
    this.corrupted = corrupted;
  }
}

export class PdfDocument {
  constructor({ id, title, sections, protected: isProtected = false, large = false }) {
    this.id = id;
    this.title = title;
    this.sections = sections;
    this.protected = isProtected;
    this.large = large;
  }
}

// A small, realistic fixture set that exercises every failure mode.
export function sampleCorpus() {
  return [
    new PdfDocument({
      id: "doc-01",
      title: "Clean Research Paper",
      sections: [
        new PdfSection("s1", "Abstract: An overview of subagent coordination."),
        new PdfSection("s2", "Introduction: Motivation and scope."),
        new PdfSection("s3", "Methodology: How agents recover from errors."),
      ],
    }),
    new PdfDocument({
      id: "doc-02",
      title: "Partially Corrupted Report",
      sections: [
        new PdfSection("s1", "Executive summary is intact."),
        new PdfSection("s2", "Financial tables here", { corrupted: true }), // one bad section
        new PdfSection("s3", "Conclusion is readable."),
      ],
    }),
    new PdfDocument({
      id: "doc-03",
      title: "Confidential Memo (password protected)",
      protected: true,
      sections: [new PdfSection("s1", "Encrypted payload — requires password.")],
    }),
    new PdfDocument({
      id: "doc-04",
      title: "Giant Dataset Appendix (large file)",
      large: true,
      sections: [
        new PdfSection("s1", "Appendix A — huge table of numbers."),
        new PdfSection("s2", "Appendix B — even bigger."),
      ],
    }),
  ];
}
