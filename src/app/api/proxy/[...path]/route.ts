import { NextRequest, NextResponse } from "next/server";

// Backend base URL (e.g. http://192.168.10.17:8000)
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://192.168.10.17:8000";

// Build the backend URL from the catch-all route segment.
const buildBackendUrl = (req: NextRequest) => {
  const path = req.nextUrl.pathname.replace(/^\/api\/proxy/, "");
  const search = req.nextUrl.search;
  return `${BACKEND_BASE_URL}${path}${search}`;
};

// Remove Domain= attribute from Set-Cookie so it can be stored for localhost.
const stripDomainFromSetCookie = (setCookie: string) =>
  setCookie.replace(/;\s*domain=[^;]+/gi, "");

// Core proxy implementation used by all handlers.
const handleProxy = async (req: NextRequest) => {
  const url = buildBackendUrl(req);

  // Forward all headers except "host" to avoid backend mismatches.
  const headers = new Headers(req.headers);
  headers.delete("host");

  // Forward the request method and body when applicable.
  const init: RequestInit = {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
    redirect: "manual",
  };

  // Perform the backend request.
  const backendResponse = await fetch(url, init);

  // Clone headers so we can mutate Set-Cookie values.
  const responseHeaders = new Headers(backendResponse.headers);

  // Preserve all Set-Cookie headers while stripping Domain.
  const setCookie = backendResponse.headers.getSetCookie?.() ?? [];
  if (setCookie.length > 0) {
    responseHeaders.delete("set-cookie");
    for (const cookie of setCookie) {
      responseHeaders.append("set-cookie", stripDomainFromSetCookie(cookie));
    }
  }

  // Stream the response back to the client.
  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
};

// Export handlers for the required HTTP methods.
export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
