import antfu from '@antfu/eslint-config';
import stylistic from '@stylistic/eslint-plugin';

export default antfu({
	stylistic: {
		semi: true,
		indent: ['error', 'tab'],
	},
	plugins: {
		'@stylistic': stylistic,
	},

	rules: {
		'eslint-comments/no-unlimited-disable': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
		'regexp/no-obscure-range': ['error', { allowed: ['alphanumeric', 'а-я'] }],
		'@stylistic/no-mixed-spaces-and-tabs': 'error',
		'@stylistic/no-multi-spaces': 'error',
		'@stylistic/quotes': ['error', 'single'],
		'@stylistic/indent': ['error', 'tab'],
		'@stylistic/jsx-indent-props': ['error', 'tab'],
		'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
		'@stylistic/semi': ['error', 'always'],
	},

	// TypeScript and Vue are auto-detected, you can also explicitly enable them:
	typescript: true,
	vue: true,
	jsonc: false,
	yaml: false,
	jsx: true,
	tsx: true,
	scss: true,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [],
});
