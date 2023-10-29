module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist/*", "metro.config.js", "babel.config.js"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      files: ["**/*.spec.js", "**/*.spec.jsx"],
      env: {
        jest: true,
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-native", "import"],
  rules: {
    // Enforce sorting of imports alphabetically
    "import/order": [
      "error",
      {
        "newlines-between": "always", // Optional: Add a newline between groups of imports
        groups: [["builtin", "external", "internal"]], // Optional: Define import groups
        alphabetize: {
          order: "asc", // Sort in ascending order (a to z)
          caseInsensitive: true, // Case-insensitive sorting
        },
      },
    ],
  },
};
