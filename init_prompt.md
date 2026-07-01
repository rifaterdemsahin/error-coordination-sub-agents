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

## ⚡ Mandatory Initial Settings & Pre-requisites
1. **Gemini `settings.json` Permission Access**: At the very start of your session before executing commands or modifying files, check, request, or configure your permission access grants in `/Users/rifaterdemsahin/.gemini/antigravity-cli/settings.json` (or workspace settings) so that you have automated read/write, git, and command execution access without interrupting the user by repeatedly asking for permission during project build and deployment!
2. **Input Token Usage Stats**: You MUST track and display simulated/actual **Input Token Stats & Context Efficiency** at the bottom of the interactive web simulator (`index.html`), at the bottom of the CLI comparison table (`demo.js`), and at the bottom of `README.md` (e.g., showing how the resilient approach reduces input token consumption / coordinator overhead compared to the naive approach)!

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
3. **Quantifiable Metrics & Input Token Stats**: Define clear architectural metrics (e.g., *Coordinator Interventions*, *Error Recovery Rate*, *System Latency*, *Throughput*, *Memory Consumption*, and *Input Token Consumption*) that quantitatively prove the superiority of the resilient approach. You MUST include a dedicated **Input Token Stats & Efficiency Scoreboard** at the bottom of the simulator page (`index.html`), CLI tables (`demo.js`), and `README.md` demonstrating input token savings!
4. **Interactive Web Simulator (`index.html` via Pico.css & htmx)**: Build a self-contained, responsive HTML/CSS/JS web page using **Pico.css** (via CDN `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">` for clean, responsive classless semantic styling and dark mode) and **htmx** (via CDN `<script src="https://unpkg.com/htmx.org@2.0.4"></script>` for dynamic DOM interactions, responsive tab switching, and real-time simulation updates without full page reloads).
5. **Step-by-Step "How, What & Why" Visual Explanations (Embedded in `index.html`)**: At each execution step (Step 0 through Step 4), you MUST generate a visual image or architectural illustration (using your image generation tool e.g. `generate_image`, SVG diagrams, or canvas graphics) that explains:
   - **WHAT** is happening at this architectural layer/stage.
   - **WHY** the resilient pattern is superior to the naive anti-pattern here.
   - **HOW** it functions under the hood.
   You MUST embed all of these generated visual explanation diagrams directly into a dedicated **"How, What & Why" Walkthrough Section** inside `index.html` (and reference them in `README.md`). **CRITICAL**: You MUST use rich, expressive emojis (e.g., 🚀, ⚡, 🛡️, ❌, ✅, 💡, 🔍, 📊, 🎯) throughout all textual explanations, captions, card headers, and diagrams to make the presentation as visually appealing, engaging, and scannable as possible!
6. **Visual Documentation**: Generate UML diagrams (static class structure and dynamic sequence/workflow) and a comprehensive, publication-ready `README.md`.
7. **Automated Verification & Git Push**: Execute the demo script to verify correctness, then initialize git, stage, commit, and push the repository directly to GitHub.
8. **GitHub Pages Static Deployment & Auto-Open**: Configure automated static deployment via GitHub Pages. After pushing to GitHub, you MUST wait for the GitHub Actions deployment workflow to complete, confirm the site is live online (e.g., `https://<github-username>.github.io/<project-name>/`), and automatically open this live web simulator URL in the browser!
9. **LLM Attribution & Creating Model Mention**: You MUST explicitly identify your Large Language Model name/version (e.g., Google Gemini 2.5 Pro, Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o) and prominently mention which LLM created this project! This attribution MUST be displayed: (1) at the very top of `README.md` in a dedicated metadata header badge (e.g. `🤖 Generated by: <Model Name>`), (2) in the interactive web simulator (`index.html`) header badge and footer, and (3) in the command-line demo banner (`demo.js`).
10. **SEO & Web Assets (`favicon.ico`, `sitemap.xml`, `robots.txt`)**: You MUST generate static SEO assets including a custom site favicon (`favicon.ico` or SVG icon), a valid `sitemap.xml` pointing to your live GitHub Pages URL (`https://<github-username>.github.io/<project-name>/`), and a `robots.txt` allowing search engine indexing.

---

## 🛠️ Step-by-Step Execution Plan

### Step 0: Analyze Scenario & Initialize Workspace
1. **Determine Project & Repository Name**: Analyze the Exam Question and Answer above. Invent a clean, descriptive, kebab-case project folder name (e.g., `distributed-cache-stampede-demo` or `api-rate-limiter-resilience`) that represents the architectural pattern being demonstrated. Let `<project-name>` be this derived name. Let `<github-username>` be the user's GitHub username (or default to `rifaterdemsahin`).
2. **Create & Initialize Local Directory**:
   Open your terminal and create the local project folder:
   ```bash
   mkdir -p <project-name>
   cd <project-name>
   git init -b main
   ```
3. 🎨 **Visual Explanation Image (Step 0)**: Generate an introductory architectural concept illustration explaining **WHAT** the core bottleneck is and **WHY** the recommended solution resolves it. Save to `docs/` and prepare to embed in `index.html`.

---

## 📁 Required Project Layout

You must create the following directory structure inside the `<project-name>` folder:

```
<project-name>/
├── .github/
│   └── workflows/
│       └── static.yml         # GitHub Actions workflow for deploying static content to GitHub Pages
├── package.json               # ESM configuration ("type": "module"), script commands ("start", "naive", "resilient")
├── demo.js                    # CLI runner executing both scenarios & printing comparative ascii tables
├── index.html                 # Interactive visual simulator (modern aesthetics, Pico.css + htmx, dark mode)
├── favicon.ico                # Site favicon (or favicon.svg)
├── sitemap.xml                # SEO sitemap referencing live GitHub Pages URL
├── robots.txt                 # SEO search engine crawler instructions
├── README.md                  # Comprehensive documentation (Question, Answer, Quickstart, Architecture Walkthrough)
├── docs/                      # Visual architecture diagrams & generated step explanation images
│   ├── uml-class.svg          # Static class & interface structure
│   ├── uml-workflow.svg       # Runtime sequence diagram showing error triage & escalation
│   └── step-images/           # Step-by-step How, What & Why visual illustrations
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

### Step 1: Domain Modeling & Simulated Infrastructure (`src/`)
- **No Dependency Cycles**: Ensure a unidirectional dependency chain: `domain` → `infrastructure/service` → `subagent implementations` → `coordinator` → `entry point`.
- **Typed Errors as Architectural Seams**: Define distinct error classes (e.g., `TransientError` tagged with `recoverable: true` vs. `FatalError` tagged with `recoverable: false`) so callers can programmatically branch on failure type.
- **Duck-Typed Contract**: Both the naive and resilient implementations must implement the exact same interface (e.g., `async process(item) -> Result`) allowing the coordinator to execute either interchangeably.
- **Structured Escalation Contract**: In the resilient implementation, catch transient errors locally (retry, fallback, or degrade). When escalating unresolvable errors, return a structured result (`status`, `partialResults`, `attemptLog`, `errorContext`) rather than throwing raw exceptions.
- 🎨 **Visual Explanation Image (Step 1)**: Generate an illustration explaining **HOW** typed errors act as architectural seams and **WHY** structured escalation prevents coordinator overload. Save to `docs/` and prepare to embed in `index.html`.

---

### Step 2: Command-Line Demo Runner (`demo.js`)
- Create an executable Node.js CLI script (`#!/usr/bin/env node`).
- Execute the simulated workload under both scenarios and aggregate metrics.
- Output clean, professional ascii comparison tables showing the exact metric contrast (e.g., coordinator interventions dropping from `3` down to `1`).
- Support command-line flags: `--naive` (run naive only), `--resilient` (run resilient only), and default (run both side-by-side).
- 🎨 **Visual Explanation Image (Step 2)**: Generate an illustration showing **HOW** the CLI benchmarking engine executes naive vs. resilient workflows side-by-side. Save to `docs/` and prepare to embed in `index.html`.

---

### Step 3: Visually Stunning Responsive Web Simulator (`index.html` via Pico.css & htmx)
- Build a standalone HTML/CSS/JS web interface utilizing **Pico.css** and **htmx** with **state-of-the-art responsive aesthetics**:
  - Link **Pico.css** (`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">`) for responsive semantic layouts, clean grid systems, and built-in dark mode support.
  - Link **htmx** (`<script src="https://unpkg.com/htmx.org@2.0.4"></script>`) to power dynamic DOM updates, scenario switching tabs, and interactive simulation controls without full page reloads.
  - Deep dark mode color palette with glassmorphic cards, custom styling overrides, and subtle gradients.
  - Modern typography (e.g., Google Fonts: Inter, Roboto, or Outfit).
  - Smooth hover effects, transitions, and micro-animations.
- Include interactive features:
  - Simulation control buttons (Play, Pause, Step, Reset) driven by responsive event handling.
  - Scenario toggle (Naive vs. Resilient vs. Side-by-Side).
  - Animated metric scoreboards comparing coordinator interventions, success rates, and local recoveries.
  - Real-time event log viewer detailing what occurred at each step.
- 🎨 **Visual Explanation Image (Step 3) & EMBEDDING**: Generate a UI architecture illustration explaining **HOW** the browser simulation visualizes real-time metrics. **CRITICAL REQUIREMENT: Embed all generated step images (from Steps 0, 1, 2, and 3) directly into `index.html`** inside elegant glassmorphic cards with clear captions explaining the How, What, and Why for each step, heavily utilizing expressive emojis (🚀, ⚡, 💡, 🛡️, 🔍) for visual appeal!

---

### Step 4: Documentation, SEO Assets (`favicon.ico`, `sitemap.xml`, `robots.txt`), Architecture Diagrams & GitHub Actions (`docs/`, `README.md`, `.github/workflows/static.yml`)
- Generate static SEO & website assets:
  - **`favicon.ico`** (or `favicon.svg` linked in `index.html` header): A clean, modern icon representing the architectural concept.
  - **`sitemap.xml`**: A valid XML sitemap containing the live GitHub Pages URL (`https://<github-username>.github.io/<project-name>/`).
  - **`robots.txt`**: Standard crawler instructions allowing search engines to index the site and pointing to `sitemap.xml`.
- Generate UML diagrams in `docs/` (as SVG files or embedded Mermaid charts):
  - **Class Diagram**: Showing static relationships, interfaces, and module structure.
  - **Workflow Diagram**: Sequence diagram showing runtime flow, local recovery loops, and escalation paths.
- Write a publication-grade `README.md` including:
  - 🌐 **Live Interactive Web Simulator Link**: Prominently feature the GitHub Pages URL at the very top of `README.md` (e.g., `https://<github-username>.github.io/<project-name>/` similar to `https://rifaterdemsahin.github.io/claude-cowork/`).
  - 🤖 **Creating LLM Attribution**: Prominently display a badge or header stating which Large Language Model (e.g., Google Gemini 2.5 Pro, Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o) generated and built this project.
  - The exact Claude AI Architect Exam Question and Answer.
  - Quickstart instructions (`npm start`, `node demo.js`, `open index.html`).
  - Side-by-side outcome summary table.
  - Detailed module explanation and architectural rationale with emojis.
  - Key code snippets highlighting the difference between naive bubbling and resilient local recovery.
- 🎨 **Visual Explanation Image (Step 4)**: Generate an overall system summary illustration and ensure all step explanation images are embedded into `README.md` alongside the walkthrough.
- **Create GitHub Actions Static Deployment Workflow**:
  Create `.github/workflows/static.yml` (similar to `https://github.com/rifaterdemsahin/hub-spoke-multi-agent-orchestrator/blob/main/.github/workflows/static.yml`) with the exact automated deployment configuration:
  ```yaml
  # Simple workflow for deploying static content to GitHub Pages
  name: Deploy static content to Pages

  on:
    # Runs on pushes targeting the default branch
    push:
      branches: ["main"]

    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

  # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
  permissions:
    contents: read
    pages: write
    id-token: write

  # Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
  # However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
  concurrency:
    group: "pages"
    cancel-in-progress: false

  jobs:
    # Single deploy job since we're just deploying
    deploy:
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      runs-on: ubuntu-latest
      steps:
        - name: Checkout
          uses: actions/checkout@v4
        - name: Setup Pages
          uses: actions/configure-pages@v5
        - name: Upload artifact
          uses: actions/upload-pages-artifact@v3
          with:
            # Upload entire repository
            path: '.'
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v5
  ```

---

### Step 5: Local Verification & Testing
- Run `node demo.js` via terminal to verify zero syntax errors, proper import resolution, and accurate metric calculation.
- Verify that all visual assets and scripts are correctly linked and functional.

---

### Step 6: Git Commit, GitHub Push, Enable Pages via `gh` & Auto-Open Live Page
- Stage all generated project files:
  ```bash
  git add .
  ```
- Commit with a descriptive semantic message:
  ```bash
  git commit -m "feat: demonstrate architectural solution for <project-name>"
  ```
- **Create and Push to GitHub Repository**:
  Use the GitHub CLI (`gh`) to automatically create the remote repository and push:
  ```bash
  gh repo create <github-username>/<project-name> --public --source=. --remote=origin --push
  ```
  *(Alternative fallback if `gh` is unavailable: create the repository manually on GitHub, then run:*
  ```bash
  git remote add origin https://github.com/<github-username>/<project-name>.git
  git branch -M main
  git push -u origin main
  ```
  *)*
- **Enable GitHub Pages via `gh` CLI Methods**:
  After pushing, enable GitHub Pages deployment via GitHub Actions workflow using the `gh` API command:
  ```bash
  gh api -X POST /repos/<github-username>/<project-name>/pages -f "build_type=workflow" || gh api -X PUT /repos/<github-username>/<project-name>/pages -f "build_type=workflow" || true
  ```
  The live URL will be:
  `https://<github-username>.github.io/<project-name>/`
- **Wait for GitHub Actions Deployment & Automatically Open Page**:
  Wait for the GitHub Actions deployment / Pages build workflow (`static.yml`) to finish executing (e.g., using `gh run watch` or checking `curl -s -o /dev/null -w "%{http_code}" https://<github-username>.github.io/<project-name>/`). Once completed and returning HTTP 200 OK, automatically launch and open the live website in the browser:
  ```bash
  open "https://<github-username>.github.io/<project-name>/"
  ```
  *(Or if Wave browser is available: `open -a Wave "https://<github-username>.github.io/<project-name>/"`)*

---

## 🚀 Final Deliverable Instructions
Execute the steps above sequentially and thoroughly. When finished, print the CLI verification output (including the Input Token Stats summary at the bottom), confirm the successful git push to GitHub (`https://github.com/<github-username>/<project-name>`), confirm that the GitHub Actions static deployment has completed, confirm that you have automatically opened the live GitHub Pages URL in the browser (`https://<github-username>.github.io/<project-name>/`), and provide clickable local and live links to the generated `README.md` and `index.html` files.
```
