// .eslintrc.cjs
module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react-hooks", "prettier"],
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "error",
    "prefer-const": "error",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "react/jsx-boolean-value": ["error", "never"],
    "react/prop-types": "warn",
    "consistent-return": "error",
    eqeqeq: ["error", "always"],
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
