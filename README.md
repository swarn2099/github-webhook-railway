# GitHub Webhook → Cursor Dev Automation Server

## 🔧 What It Does

- Receives GitHub webhook events
- Detects when issues/cards move to `In Progress`
- Detects when pull requests are merged
- Logs structured messages (`TRIGGER_CLAUDE`) so Claude or GPT inside Cursor can act automatically using GitHub MCP tools

## 🚀 How to Deploy (Railway)

1. Push to GitHub
2. Create a new Railway project from the GitHub repo
3. Add environment variable: `GITHUB_WEBHOOK_SECRET`
4. Set GitHub webhook (Settings > Webhooks) with:
   - URL: `https://your-app.up.railway.app/webhook`
   - Content-Type: `application/json`
   - Secret: same as `.env`
   - Events: `Issues`, `Pull Requests`, `Project Cards`

## 🧠 Claude/GPT Behavior

Claude will:

- Use GitHub MCP to read the issue
- Generate code
- Push to a new branch
- Open a PR
- Move issue to Done when PR is merged
