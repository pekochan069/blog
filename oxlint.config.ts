import solidv2 from "eslint-plugin-solid/configs/v2-strict";
import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core, antiSlop],
  ignorePatterns: core.ignorePatterns,
  jsPlugins: ["eslint-plugin-solid"],
  overrides: [
    {
      files: ["./src/components/ui/*.tsx"],
      rules: {
        "anti-slop/require-safety-comment-for-type-assertion": "off",
        "sort-keys": "off",
      },
    },
    {
      files: ["**.tsx"],
      rules: {
        "no-unassigned-vars": "off",
        "typescript/no-non-null-assertion": "off",
      },
    },
    {
      files: ["**.astro"],
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
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
