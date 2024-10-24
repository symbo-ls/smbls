module.exports = {
<<<<<<< HEAD
  extends: ['standard', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parser: '@babel/eslint-parser',
  requireConfigFile: false,
  root: '',
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
=======
  extend: [
    'standard',
    'plugin:jest/all'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      configFile: './babel.config.json',
      presets: ['@babel/preset-env']
    }
  },
  plugins: ['jest', '@babel'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  overrides: [{
    files: ['packages/**/*.test.js']
>>>>>>> domql/main
  }]
}
