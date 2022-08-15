module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['promise'],
  extends: ['eslint:recommended'],
  rules: {
    // quotes: ["error", "double"],
  },
};
