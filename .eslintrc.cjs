module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:css/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'css', 
  '@stylistic/ts',],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    '@stylistic/ts/semi': ['error', 'always'],  
    '@stylistic/ts/object-curly-spacing': ['error', 'always'],  
  },
}
