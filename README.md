# 🧠 Local GitHub Webhook → Cursor Dev Automation

## 📌 What This Does

- Listens on port 3333 for GitHub webhooks (via Ngrok)
- Detects when cards are moved to `In Progress`
- Logs a `TRIGGER_CURSOR` message
- Cursor sees this and uses GitHub MCP tools to:
  - Create a branch
  - Generate code
  - Push it
  - Open a PR

## 🚀 How To Use

1. Copy `.env.example` → `.env` and add your GitHub webhook secret.
2. Start server:
   npm install
   npm run dev

3. Run Ngrok in another terminal:
   ngrok http 3333

4. Copy the Ngrok URL into your GitHub Webhook settings:

   - Payload URL: https://<your-ngrok-id>.ngrok.io/webhook
   - Content type: application/json
   - Secret: same as in .env
   - Events: Project Cards, Issues, PRs

5. Open this project in Cursor. When you move a card to `In Progress`, you'll see:
   TRIGGER_CURSOR:ISSUE_IN_PROGRESS { title, body, number }
   Cursor will react and use the GitHub MCP to do the dev work for you.
