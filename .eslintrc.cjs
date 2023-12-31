module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "mernstack"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["prettier"],
  rules: {},
}
