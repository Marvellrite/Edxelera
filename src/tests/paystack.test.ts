import { describe, expect, it } from "vitest";
import crypto from "crypto";
import { verifyPaystackWebhookSignature } from "@/lib/server/paystack";

describe("paystack signature", () => {
  it("rejects invalid signature", () => {
    expect(verifyPaystackWebhookSignature("{}", "bad")).toBe(false);
  });

  it("accepts generated signature", () => {
    process.env.PAYSTACK_WEBHOOK_SECRET = "secret";
    const raw = JSON.stringify({ event: "charge.success" });
    const sig = crypto.createHmac("sha512", "secret").update(raw).digest("hex");
    expect(verifyPaystackWebhookSignature(raw, sig)).toBe(true);
  });
});
