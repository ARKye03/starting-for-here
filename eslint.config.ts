import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import type { ESLint } from "eslint";

const jsonPlugin = json as unknown as ESLint.Plugin;
const cssPlugin = css as unknown as ESLint.Plugin;

export default defineConfig([
  {
    ignores: [
      ".vscode/**",
      ".claude/**",
      "dist/**",
      ".astro/**",
      ".vercel/**",
      "node_modules/**",
      ".wrangler/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.json"],
    ignores: ["package.json", "package-lock.json", "tsconfig.json"],
    plugins: { json: jsonPlugin },
    language: "json/json",
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  {
    files: ["**/*.css"],
    ignores: ["src/styles/global.css"],
    plugins: { css: cssPlugin },
    language: "css/css",
  },
]);
