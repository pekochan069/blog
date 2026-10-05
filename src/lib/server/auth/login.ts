import { createHash, timingSafeEqual } from "node:crypto";

import { serverEnv } from "#env";

import { apiSuccess } from "../response";
import { createAuthToken } from "./is-logged-in";

export function login(id: string, password: string) {
  const failure = { error: "올바르지 않은 계정입니다", ok: false } as const;
  if (
    id.length < 3 ||
    password.length < 12 ||
    id.length > 256 ||
    password.length > 1024 ||
    !serverEnv.ADMIN_ID ||
    !serverEnv.ADMIN_PASSWORD
  ) {
    return failure;
  }
  const actual = createHash("sha256")
    .update(JSON.stringify([id, password]))
    .digest();
  const expected = createHash("sha256")
    .update(JSON.stringify([serverEnv.ADMIN_ID, serverEnv.ADMIN_PASSWORD]))
    .digest();
  if (!timingSafeEqual(actual, expected)) {
    return failure;
  }
  const token = createAuthToken();
  return token ? apiSuccess(token) : failure;
}
