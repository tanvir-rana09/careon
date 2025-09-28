// utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        cookie: {
            name: "__session",
            secrets: [import.meta.env.SESSION_SECRET || "secret"],
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            secure: import.meta.env.SESSION_SECRET === "production",
        },
    });
