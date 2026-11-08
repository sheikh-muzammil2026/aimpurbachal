import { createAuthClient } from "better-auth/react";
import { siteConfig } from "@/config/siteConfig";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || siteConfig.contact.baseUrl,
    sessionOptions: {
        refetchOnWindowFocus: true,
        refetchWhenOffline: false,
    },
})

export const { signIn, signUp, useSession } = authClient

