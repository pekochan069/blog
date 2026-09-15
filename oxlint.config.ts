import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import solid from "ultracite/oxlint/solid";

export default defineConfig({
  extends: [core, astro, solid, antiSlop],
  ignorePatterns: core.ignorePatterns,
  overrides: [
    {
      files: ["./src/components/ui/*.tsx"],
      rules: {
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
  ],
  rules: {
    "func-style": "off",
    "unicorn/custom-error-definition": "off",
  },
});
