#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Demo runner. Runs the same research task over the same corpus twice — once
// with a NAIVE subagent (every error escalates) and once with a RESILIENT
// subagent (local recovery + structured escalation) — and prints the contrast.
//
//   node demo.js            # run both and compare
//   node demo.js --naive    # run only the naive scenario
//   node demo.js --resilient# run only the resilient scenario
// ─────────────────────────────────────────────────────────────────────────────

import { sampleCorpus } from "./src/document.js";
import { NaiveDocumentSubagent } from "./src/subagent-naive.js";
import { ResilientDocumentSubagent } from "./src/subagent-resilient.js";
import { Coordinator } from "./src/coordinator.js";

const args = new Set(process.argv.slice(2));
const runNaive = !args.has("--resilient");
const runResilient = !args.has("--naive");

const hr = "──────────────────────────────────────────────────────────────────────────";

function summarize(label, outcome) {
  const { results, coordinatorInterventions, log } = outcome;
  const counts = results.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    },
    { success: 0, partial: 0, failed: 0 },
  );

  console.log(hr);
  console.log(`  SCENARIO: ${label}`);
  console.log(hr);
  console.log(`  Documents processed ......... ${results.length}`);
  console.log(
    `    ├─ success (clean) ......... ${counts.success ?? 0}`,
  );
  console.log(
    `    ├─ partial (self-recovered)  ${counts.partial ?? 0}`,
  );
  console.log(
    `    └─ failed (escalated) ...... ${counts.failed ?? 0}`,
  );
  console.log(
    `  ⚙️  Coordinator interventions . ${coordinatorInterventions}   <- lower is better`,
  );
  console.log();
  console.log("  Per-document outcome:");
  for (const r of results) {
    const tag =
      r.status === "success"
        ? "✅ success  "
        : r.status === "partial"
          ? "🟡 partial  "
          : "🔴 failed   ";
    const detail =
      r.warnings.length > 0
        ? ` (${r.warnings.length} local warning(s) handled by subagent)`
        : r.error
          ? ` (escalated: ${r.error.type})`
          : "";
    console.log(`    ${tag}${r.documentId}${detail}`);
  }
  if (log.length > 0) {
    console.log();
    console.log("  Coordinator triage log:");
    for (const line of log) console.log(`    ${line}`);
  }
  console.log();
  return { coordinatorInterventions, counts };
}

async function main() {
  const corpus = sampleCorpus();
  console.log(
    "\n📚 Research task: analyze %d PDF documents via a document-analysis subagent.\n",
    corpus.length,
  );

  let naive = null;
  let resilient = null;

  if (runNaive) {
    const coordinator = new Coordinator({
      subagent: new NaiveDocumentSubagent(),
      mode: "naive",
    });
    naive = summarize(
      "NAIVE subagent — every exception terminates & escalates",
      await coordinator.runResearchTask(corpus),
    );
  }

  if (runResilient) {
    const coordinator = new Coordinator({
      subagent: new ResilientDocumentSubagent(),
      mode: "resilient",
    });
    resilient = summarize(
      "RESILIENT subagent — local recovery + structured escalation",
      await coordinator.runResearchTask(corpus),
    );
  }

  if (naive && resilient) {
    console.log(hr);
    console.log("  VERDICT");
    console.log(hr);
    console.log(
      `  Coordinator interventions: ${naive.coordinatorInterventions}  ->  ${resilient.coordinatorInterventions}`,
    );
    console.log(
      "  The resilient subagent resolved transient failures (corrupted sections,",
    );
    console.log(
      "  timeouts) locally and only escalated the genuinely unresolvable case",
    );
    console.log(
      "  (password protection) WITH partial results + an attempt log.",
    );
    console.log(
      "  => The coordinator stops being a bottleneck for routine error handling.\n",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
