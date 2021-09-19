module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "17"
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "*/tsconfig.json"
      },
      node: {
        extensions: [".ts", ".tsx", ".d.ts"]
      }
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/typescript"
  ],
  rules: {
    "import/default": "off",
    "sort-imports": 0,
    "import/order": [2, { "alphabetize": { "order": "asc" } }]
  }
};
