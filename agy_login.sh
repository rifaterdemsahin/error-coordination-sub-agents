#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# agy Startup / Login Hook Script
# Automatically starts the local dev server on port 8888 and opens the
# interactive demo pages inside the Wave browser.
# ─────────────────────────────────────────────────────────────────────────────

echo "⚡ [agy hook] Initializing error-coordination-sub-agents environment..."

# 1. Check if server is already listening on port 8888
if ! lsof -i :8888 >/dev/null 2>&1; then
  echo "🌐 Starting local dev server on http://localhost:8888 in background..."
  nohup npx http-server -p 8888 -c-1 . > /tmp/agy_server_8888.log 2>&1 &
  sleep 1
else
  echo "✅ Server already running on port 8888."
fi

# 2. Open pages in Wave Browser
echo "🌊 Launching interactive pages in Wave browser..."
open -a Wave "http://localhost:8888/prompt_builder.html"
open -a Wave "http://localhost:8888/index.html"

echo "✨ Environment ready! You can visit http://localhost:8888/prompt_builder.html"
