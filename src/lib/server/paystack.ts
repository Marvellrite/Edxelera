export type PaystackInitResponse = {
  authorization_url: string;
  reference: string;
};

export async function initializePaystackTransaction(): Promise<PaystackInitResponse> {
  // TODO: Call Paystack initialize endpoint.
  return {
    authorization_url: "https://checkout.paystack.com/example",
    reference: `pay_${Date.now()}`,
  };
}

export async function verifyPaystackTransaction(reference: string) {
  // TODO: Call Paystack verify endpoint.
  return {
    reference,
    status: "success" as const,
    paidAtUtc: new Date().toISOString(),
  };
}

export function verifyPaystackWebhookSignature(_rawBody: string, _signature: string | null) {
  // TODO: Implement HMAC signature verification using PAYSTACK_WEBHOOK_SECRET.
  return false;
}