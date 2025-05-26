import crypto from "crypto";

export function verifySignature(
  payload: string,
  signature: string | string[] | undefined,
  secret: string
): boolean {
  if (!signature || typeof signature !== "string") return false;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
