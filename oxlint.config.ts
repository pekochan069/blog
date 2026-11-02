import solidv2 from "eslint-plugin-solid/configs/v2-strict";
import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core, antiSlop],
  ignorePatterns: [
    ...(core.ignorePatterns === undefined ? [] : core.ignorePatterns),
    "src/components/ui-bak/*",
  ],
  jsPlugins: ["eslint-plugin-solid"],
  rules: {
    ...solidv2.rules,
    "func-style": "off",
    "solid/jsx-no-undef": "error",
    "solid/no-destructure": "error",
    "solid/reactivity": "warn",
    "typescript/no-deprecated": "error",
    "unicorn/custom-error-definition": "off",
  },
  settings: { solid: { version: 2 } },
});
