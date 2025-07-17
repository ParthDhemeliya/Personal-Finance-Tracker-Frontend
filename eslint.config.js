import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", ".next", "node_modules", "out", "build", "coverage"],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "next",
      "next/core-web-vitals",
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Disallow console.log in production
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      // Prevent unused variables
      "no-unused-vars": "error",
      // Enforce const where variables are not reassigned
      "prefer-const": "error",
      // Organize imports alphabetically and by type
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      // Enforce shorthand for boolean props in JSX
      "react/jsx-boolean-value": ["error", "never"],
      // Ensure prop validation clarity even with TypeScript
      "react/prop-types": "warn",
      // Ensure functions return consistently
      "consistent-return": "error",
      // Enforce strict equality
      eqeqeq: ["error", "always"],
    },
  },
);
