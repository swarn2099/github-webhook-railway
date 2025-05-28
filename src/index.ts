import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { handleGitHubEvent } from "./githubWebhook.js";
import { verifySignature } from "./utils/verifySignature.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const signature = req.headers["x-hub-signature-256"] as string;
  const event = req.headers["x-github-event"] as string;

  handleGitHubEvent(event, req.body);
  res.status(200).send("Webhook received");
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on http://localhost:${PORT}`);
});
