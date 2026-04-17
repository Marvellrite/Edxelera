import { WEB_CLIENT_HEADER, PROXY_URL } from "@/constants";
import { AuthResponse } from "../types";

const meAPI = {
      getMe: async () => {
    const response = await fetch(`${PROXY_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...WEB_CLIENT_HEADER,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user data");
    }

    return response.json() as Promise<AuthResponse>;
  },
}

export default meAPI;