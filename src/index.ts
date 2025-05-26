// If using Node.js < 18, install node-fetch and uncomment the following line:
// import fetch from 'node-fetch';
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { handleGitHubEvent } from "./githubWebhook.js";
import { verifySignature } from "./utils/verifySignature.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post("/webhook", async (req: Request, res: Response) => {
  const signature = req.headers["x-hub-signature-256"];
  const event = req.headers["x-github-event"] as string;

  if (
    !verifySignature(
      JSON.stringify(req.body),
      signature,
      process.env.GITHUB_WEBHOOK_SECRET || ""
    )
  ) {
    return res.status(401).send("Invalid signature");
  }

  await handleGitHubEvent(event, req.body);
  res.status(200).send("Event received");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
