import { WEB_CLIENT_HEADER } from "@/constants";
import { AuthResponse } from "../types";
import env from "@/lib/env";

const signOutAPI = {
      signOut: async () => {
    const response = await fetch(`${env.NEXT_PUBLIC_PROXY_URL}/auth/sign-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...WEB_CLIENT_HEADER,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign out failed");
    }

    return response.json() as Promise<AuthResponse>;
  },
}

export default signOutAPI