module.exports = {
  extends: ["standard", "plugin:jest/recommended"],
  plugins: ["jest", "prettier"],
  parser: "@babel/eslint-parser",
  requireConfigFile: false,
  root: "",
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ["test/**/*.test.js"],
      env: { jest: true },
      plugins: ["jest"],
    },
  ],
};
