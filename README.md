# error-coordination-sub-agents

> A demo of the right way to handle failures between a **coordinator** and its **subagents**:
> **local recovery for transient failures; escalate only what can't be resolved — with context.**

## The question this project demonstrates

> The document analysis subagent frequently encounters failures when processing PDF
> files — corrupted sections, password-protected files, and parse timeouts on large files.
> Today any exception terminates the subagent and forces the coordinator to decide whether
> to retry, skip, or fail the whole task. This causes **excessive coordinator involvement
> in routine error handling.** What's the most effective architectural improvement?

### ✅ The answer

**Have the subagent implement local recovery for transient failures and only propagate
errors it cannot resolve to the coordinator — including what was attempted and any partial
results obtained.**

To keep the coordinator from being bottlenecked by routine execution issues, subagents
should be **robust and self-contained**. Local error handling + graceful degradation lets
the subagent resolve transient issues itself. When it hits a genuinely unresolvable failure
(e.g. hard password protection) it bubbles up **structured error context** along with
**partial successes** — minimizing coordinator overhead while preserving visibility.

## Run the Node demo

```bash
node demo.js            # run both scenarios and compare
node demo.js --naive    # only the "before" (every exception escalates)
node demo.js --resilient# only the "after" (local recovery + structured escalation)
```

Expected contrast over the same 4-document corpus:

| Scenario | success | partial (self-recovered) | failed (escalated) | Coordinator interventions |
|----------|--------:|-------------------------:|-------------------:|--------------------------:|
| Naive subagent     | 1 | 0 | 3 | **3** |
| Resilient subagent | 2 | 1 | 1 | **1** |

The resilient subagent recovers the corrupted-section and timeout cases **locally** and only
escalates the password-protected document — with an attempt log and any partials.

## Open the interactive page

```bash
open index.html
```

A self-contained in-browser simulator runs the same task two ways and animates the
coordinator-intervention counter (the metric for "how much routine work the coordinator is
being forced to handle").

## Project layout

```
demo.js                       # CLI demo — naive vs resilient, side by side
index.html                    # interactive visual explanation + simulator
src/
  document.js                 # simulated PDF model + sample corpus (3 failure modes)
  pdf-parser.js               # simulated parser: CorruptedSection / Password / Timeout errors
  subagent-naive.js           # ❌ anti-pattern: no local handling, every exception escalates
  subagent-resilient.js       # ✅ the answer: local recovery + structured escalation
  coordinator.js              # orchestrator — only triages genuine escalations
  sleep.js
```

## Key idea in one snippet

```js
// subagent-resilient.js: transient → fix locally; hard → escalate WITH context
if (err instanceof CorruptedSectionError) {
  warnings.push(`Skipped corrupted section ${section.id}; continuing.`);
  partial.push({ id: section.id, reason: "corrupted" });
  break;                          // graceful degradation, no escalation
}
if (err instanceof ParseTimeoutError && attempt < MAX_RETRIES) {
  budgetMs += 80;                 // local recovery: widen budget and retry
  continue;
}
// ... only password protection (unresolvable locally) reaches the coordinator,
//     returned as { status: "failed", error: {...}, partial: [...], attempts: [...] }
```
