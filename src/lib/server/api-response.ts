export type ApiErrorPayload = {
  ok: false;
  error: { code: string; message: string; details?: Record<string, unknown> };
};

export function notImplemented(message = "Not implemented") {
  return {
    ok: false,
    error: {
      code: "NOT_IMPLEMENTED",
      message,
    },
  } satisfies ApiErrorPayload;
}

export function ok<T>(data: T) {
  return { ok: true, data };
}