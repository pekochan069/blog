import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import solid from "ultracite/oxlint/solid";

export default defineConfig({
  extends: [core, astro, solid, antiSlop],
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
    "func-style": "off",
    "solid/jsx-no-undef": "error",
    "solid/no-destructure": "error",
    "solid/reactivity": "warn",
    "unicorn/custom-error-definition": "off",
  },
  settings: { solid: { version: 2 } },
});
