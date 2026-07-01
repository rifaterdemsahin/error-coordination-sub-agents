# Claude AI Architect Exam — Project Generator Prompt (`init_prompt.md`)

This document provides a comprehensive, reusable initialization prompt designed to instruct an AI coding assistant (such as Google Antigravity, Claude, Cursor, or Copilot) to generate a complete, standalone, runnable architectural demonstration repository from scratch based on any generic **Claude AI Architect Exam** Question and Answer.

---

## 🤖 How to Use This Prompt

1. Copy the prompt block below.
2. Replace the placeholders `{{EXAM_QUESTION}}` and `{{EXAM_ANSWER}}` with your specific exam question and recommended architectural solution.
3. Feed the prompt into your AI coding assistant in an empty repository or workspace.
4. The agent will build the entire project (domain models, CLI runner, interactive web simulator, UML diagrams, and README), verify it, and automatically commit and push to your git remote.

---

## 📋 The Master Initialization Prompt

```markdown
# TASK: Generate an Architectural Demonstration Project for the Claude AI Architect Exam

You are an expert Principal AI Architect and Systems Engineer. Your task is to build a complete, runnable, production-grade architectural demonstration project from scratch based on the provided **Claude AI Architect Exam** Question and Answer.

## 📝 Input: Exam Scenario

**Question:**
> {{EXAM_QUESTION}}

**Answer / Recommended Architectural Solution:**
> {{EXAM_ANSWER}}

---

## 🎯 Project Goals & Architectural Philosophy

The objective of this repository is to transform an abstract architectural exam concept into a concrete, interactive, side-by-side demonstration proving **why** the recommended architectural solution is superior to the common naive anti-pattern.

### Core Architecture Requirements:
1. **Zero-Dependency Node.js ESM Backend**: Use clean, modern JavaScript with `"type": "module"` in `package.json`. Rely on Node.js built-in utilities without heavy external runtime dependencies so the repository is lightweight and universally executable.
2. **Side-by-Side Comparison (Naive vs. Resilient/Optimized)**: Implement both:
   - **The Anti-Pattern (Naive Approach)**: Demonstrating the common pitfalls (e.g., lack of local error handling, unhandled exception bubbling, tight coupling, synchronous bottlenecks, or excessive coordinator overhead).
   - **The Answer (Resilient Approach)**: Demonstrating the recommended architectural pattern (e.g., local error recovery, structured escalation, graceful degradation, circuit breaking, decoupling, or bounded retries).
3. **Quantifiable Metrics**: Define clear architectural metrics (e.g., *Coordinator Interventions*, *Error Recovery Rate*, *System Latency*, *Throughput*, or *Memory Consumption*) that quantitatively prove the superiority of the resilient approach.
4. **Interactive Web Simulator (`index.html`)**: Build a self-contained, visually stunning vanilla HTML/CSS/JS page that simulates the runtime behavior in the browser with real-time animated counters, log feeds, and side-by-side comparison toggles.
5. **Visual Documentation**: Generate UML diagrams (static class structure and dynamic sequence/workflow) and a comprehensive, publication-ready `README.md`.
6. **Automated Verification & Git Push**: Execute the demo script to verify correctness, then stage, commit, and push the repository to remote.

---

## 📁 Required Project Layout

Create the following directory structure and modular architecture:

```
├── package.json               # ESM configuration ("type": "module"), script commands ("start", "naive", "resilient")
├── demo.js                    # CLI runner executing both scenarios & printing comparative ascii tables
├── index.html                 # Interactive visual simulator (modern aesthetics, dark mode, micro-animations)
├── README.md                  # Comprehensive documentation (Question, Answer, Quickstart, Architecture Walkthrough)
├── docs/                      # Visual architecture diagrams
│   ├── uml-class.svg          # Static class & interface structure
│   └── uml-workflow.svg       # Runtime sequence diagram showing error triage & escalation
└── src/                       # Core domain and implementation modules
    ├── domain.js              # Domain model, data entities, and simulated test corpus/workload
    ├── infrastructure.js      # Simulated I/O, network, or external services (with typed error classes)
    ├── subagent-naive.js      # ❌ Anti-pattern implementation (no local handling, over-escalates)
    ├── subagent-resilient.js  # ✅ The Answer implementation (local recovery, structured results)
    ├── coordinator.js         # Orchestrator/Coordinator against a duck-typed interface
    └── utils.js               # Helpers (e.g., sleep, formatters, latency simulation)
```

*(Note: Adapt module filenames inside `src/` to reflect the specific domain of the exam question, such as `document.js`, `pdf-parser.js`, `cache-layer.js`, or `database-pool.js`.)*

---

## 🛠️ Step-by-Step Execution Plan

### Step 1: Domain Modeling & Simulated Infrastructure (`src/`)
- **No Dependency Cycles**: Ensure a unidirectional dependency chain: `domain` → `infrastructure/service` → `subagent implementations` → `coordinator` → `entry point`.
- **Typed Errors as Architectural Seams**: Define distinct error classes (e.g., `TransientError` tagged with `recoverable: true` vs. `FatalError` tagged with `recoverable: false`) so callers can programmatically branch on failure type.
- **Duck-Typed Contract**: Both the naive and resilient implementations must implement the exact same interface (e.g., `async process(item) -> Result`) allowing the coordinator to execute either interchangeably.
- **Structured Escalation Contract**: In the resilient implementation, catch transient errors locally (retry, fallback, or degrade). When escalating unresolvable errors, return a structured result (`status`, `partialResults`, `attemptLog`, `errorContext`) rather than throwing raw exceptions.

### Step 2: Command-Line Demo Runner (`demo.js`)
- Create an executable Node.js CLI script (`#!/usr/bin/env node`).
- Execute the simulated workload under both scenarios and aggregate metrics.
- Output clean, professional ascii comparison tables showing the exact metric contrast (e.g., coordinator interventions dropping from `3` down to `1`).
- Support command-line flags: `--naive` (run naive only), `--resilient` (run resilient only), and default (run both side-by-side).

### Step 3: Visually Stunning Interactive Web Simulator (`index.html`)
- Build a standalone vanilla HTML/CSS/JS web interface with **state-of-the-art aesthetics**:
  - Deep dark mode color palette with glassmorphic cards and subtle gradients.
  - Modern typography (e.g., Google Fonts: Inter, Roboto, or Outfit).
  - Smooth hover effects, transitions, and micro-animations.
- Include interactive features:
  - Simulation control buttons (Play, Pause, Step, Reset).
  - Scenario toggle (Naive vs. Resilient vs. Side-by-Side).
  - Animated metric scoreboards comparing coordinator interventions, success rates, and local recoveries.
  - Real-time event log viewer detailing what occurred at each step.

### Step 4: Documentation & Architecture Diagrams (`docs/` & `README.md`)
- Generate UML diagrams in `docs/` (as SVG files or embedded Mermaid charts):
  - **Class Diagram**: Showing static relationships, interfaces, and module structure.
  - **Workflow Diagram**: Sequence diagram showing runtime flow, local recovery loops, and escalation paths.
- Write a publication-grade `README.md` including:
  - The exact Claude AI Architect Exam Question and Answer.
  - Quickstart instructions (`npm start`, `node demo.js`, `open index.html`).
  - Side-by-side outcome summary table.
  - Detailed module explanation and architectural rationale.
  - Key code snippets highlighting the difference between naive bubbling and resilient local recovery.

### Step 5: Verification & Validation
- Run `node demo.js` via terminal to verify zero syntax errors, proper import resolution, and accurate metric calculation.
- Verify that all visual assets and scripts are correctly linked and functional.

### Step 6: Git Commit & Push
- Stage all generated project files:
  ```bash
  git add .
  ```
- Commit with a descriptive semantic message:
  ```bash
  git commit -m "feat: demonstrate architectural solution for <exam-topic>"
  ```
- Push the repository to the remote branch:
  ```bash
  git push origin main
  ```

---

## 🚀 Final Deliverable Instructions
Execute the steps above sequentially and thoroughly. When finished, print the CLI verification output, confirm the successful git push, and provide clickable links to the generated `README.md` and `index.html` files.
```
