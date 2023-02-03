module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: [".eslintrc.cjs"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
  },
};
