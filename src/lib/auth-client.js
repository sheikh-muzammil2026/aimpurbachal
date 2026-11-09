import { createAuthClient } from "better-auth/react";
import { siteConfig } from "@/config/siteConfig";

const resolvedBaseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.BETTER_AUTH_URL || siteConfig.contact.baseUrl;

export const authClient = createAuthClient({
  baseURL: resolvedBaseUrl,
  sessionOptions: {
    refetchOnWindowFocus: true,
    refetchWhenOffline: false,
  },
});

export const { signIn, signUp, useSession } = authClient;


