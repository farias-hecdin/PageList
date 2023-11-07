module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsdoc/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jsdoc'],
  rules: {
    "jsdoc/require-asterisk-prefix": 1,
    'jsdoc/require-description': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-property-description': 0,
    'jsdoc/require-returns-description': 0,
    "react/no-access-state-in-setstate": "error",
    'react/prop-types': 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
