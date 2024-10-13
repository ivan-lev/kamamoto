import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },

  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'regexp/no-obscure-range': ['error', { allowed: ['alphanumeric', 'а-я'] }],
    'n/prefer-global/process': ['error', 'always'],
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,
  jsonc: false,
  yaml: false,
  jsx: true,
  tsx: true,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [],
});
