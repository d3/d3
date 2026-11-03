import js from "@eslint/js";
import globals from "globals";
import {defineConfig} from "eslint/config";

export default defineConfig([
  {ignores: ["dist/", "docs/"]},
  {files: ["**/*.{js,ts}"], plugins: {js}, extends: ["js/recommended"]},
  {files: ["**/*.{js,ts}"], languageOptions: {globals: globals.browser}},
  {languageOptions: {ecmaVersion: 2019, sourceType: "module"}},
  {files: ["rollup.config.js", "test/**/*.{js,ts}"], languageOptions: {ecmaVersion: 2026}}
]);
