import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { serverEnv } from "#env";

export const authCookieName = "admin-auth";
export const authCookieOptions = {
  httpOnly: true,
  maxAge: 8 * 60 * 60,
  path: "/",
  sameSite: "strict",
  secure: serverEnv.NODE_ENV === "production",
} as const;

function sign(payload: string) {
  const { ADMIN_AUTH_SECRET, ADMIN_ID, ADMIN_PASSWORD } = serverEnv;
  if (!ADMIN_AUTH_SECRET || ADMIN_AUTH_SECRET.length < 32 || !ADMIN_ID || !ADMIN_PASSWORD) {
    return null;
  }
  return createHmac("sha256", ADMIN_AUTH_SECRET)
    .update(JSON.stringify(["admin-session-v1", ADMIN_ID, ADMIN_PASSWORD, payload]))
    .digest("hex");
}

export function createAuthToken() {
  const expires = Math.floor(Date.now() / 1000) + authCookieOptions.maxAge;
  const payload = `${expires}.${randomBytes(32).toString("hex")}`;
  const signature = sign(payload);
  return signature ? `${payload}.${signature}` : null;
}

export function isLoggedIn(authToken?: string) {
  if (!authToken || !/^\d{10}\.[a-f0-9]{64}\.[a-f0-9]{64}$/u.test(authToken)) {
    return false;
  }
  const [expires, nonce, signature] = authToken.split(".");
  if (Number(expires) <= Math.floor(Date.now() / 1000)) {
    return false;
  }
  const expected = sign(`${expires}.${nonce}`);
  return (
    expected !== null &&
    timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"))
  );
}
