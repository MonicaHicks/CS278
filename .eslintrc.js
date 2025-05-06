module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      // Add your custom rules here
      'prettier/prettier': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };