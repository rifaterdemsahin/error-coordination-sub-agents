# Project-Scoped Agent Rules (`error-coordination-sub-agents`)

## ⚡ Mandatory Server & Wave Browser Startup on Session Start / Login (`agy`)
Whenever starting a new conversation session, logging into `agy`, or resuming a workspace session in this directory, ALWAYS immediately perform the following startup routine without making the user ask or prompt for it:

1. **Verify / Start Local Development Server**:
   - Check if the server is already running on port `8888` by calling `curl -s -o /dev/null -w "%{http_code}" http://localhost:8888/prompt_builder.html` or `lsof -i :8888`.
   - If not running, launch the local development server asynchronously in the background:
     ```bash
     npm run dev
     ```
2. **Open Interactive Pages in Wave Browser**:
   - Automatically launch the interactive applications inside the **Wave** browser:
     ```bash
     npm run wave
     ```
     *(Or directly: `open -a Wave "http://localhost:8888/prompt_builder.html"` and `open -a Wave "http://localhost:8888/index.html"`).*
3. **No Prompting Needed**: Execute this setup automatically and provide clickable localhost links to the user in your response.
