module.exports = {
  extends: ['standard', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parser: '@babel/eslint-parser',
  requireConfigFile: false,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  overrides: [{
    files: ['test/**/*.test.js'],
    env: { jest: true },
    plugins: ['jest']
  }]
}
