import assert from "node:assert/strict";
import { test } from "node:test";

import { serverEnv } from "#env";

import { isLoggedIn } from "./is-logged-in";
import { login } from "./login";

test("admin authentication rejects invalid credentials, tampering, expiry and missing config", (context) => {
  const previous = { ...serverEnv };
  Object.assign(serverEnv, {
    ADMIN_AUTH_SECRET: "a".repeat(64),
    ADMIN_ID: "administrator",
    ADMIN_PASSWORD: "a-long-test-password",
  });
  try {
    assert.equal(login("administrator", "incorrect-password").ok, false);
    assert.equal(login("wrong-admin-id", "a-long-test-password").ok, false);
    const result = login("administrator", "a-long-test-password");
    assert.equal(result.ok, true);
    if (!result.ok) {
      throw new Error("Login failed");
    }
    assert.equal(isLoggedIn(result.data), true);
    const [expires, nonce, signature] = result.data.split(".");
    const tamperedNonce = `${nonce[0] === "a" ? "b" : "a"}${nonce.slice(1)}`;
    assert.equal(isLoggedIn(`${expires}.${tamperedNonce}.${signature}`), false);
    assert.equal(isLoggedIn(`${Number(expires) + 1}.${nonce}.${signature}`), false);
    assert.equal(login("short", "short").ok, false);
    for (const token of [undefined, "", "garbage", `${result.data}x`, `0${result.data}`]) {
      assert.equal(isLoggedIn(token), false);
    }
    const now = Date.now();
    context.mock.method(Date, "now", () => now + 8 * 60 * 60 * 1000);
    assert.equal(isLoggedIn(result.data), false);
    context.mock.restoreAll();
    serverEnv.ADMIN_PASSWORD = "changed-password";
    assert.equal(isLoggedIn(result.data), false);
    serverEnv.ADMIN_PASSWORD = "a-long-test-password";
    serverEnv.ADMIN_AUTH_SECRET = undefined;
    assert.equal(isLoggedIn(result.data), false);
    assert.equal(login("administrator", "a-long-test-password").ok, false);
    serverEnv.ADMIN_AUTH_SECRET = "short";
    assert.equal(login("administrator", "a-long-test-password").ok, false);
    serverEnv.ADMIN_ID = undefined;
    assert.equal(isLoggedIn(result.data), false);
  } finally {
    Object.assign(serverEnv, previous);
  }
});
