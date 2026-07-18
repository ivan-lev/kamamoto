import antfu from '@antfu/eslint-config';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';

export default antfu({
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
		'@stylistic/indent-binary-ops': ['error', 'tab'],
		'@stylistic/jsx-indent-props': ['error', 'tab'],
		'@stylistic/jsx-curly-spacing': ['error', { when: 'always', children: true, spacing: { objectLiterals: 'never' } }],
		'@stylistic/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
		'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
		'@stylistic/semi': ['error', 'always'],
		'@stylistic/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'comma',
				requireLast: true,
			},
			singleline: {
				delimiter: 'comma',
				requireLast: false,
			},
			overrides: {
				interface: {
					multiline: {
						delimiter: 'semi',
						requireLast: true,
					},
					singleline: {
						delimiter: 'semi',
						requireLast: false,
					},
				},
			},
		}],
	},

	overrides: {
		interface: {
			multiline: {
				delimiter: 'semi',
				requireLast: true,
			},
		},
	},

	// TypeScript and Vue are auto-detected, you can also explicitly enable them:
	typescript: true,
	vue: false,
	jsonc: false,
	yaml: false,
	jsx: true,
	tsx: true,
	scss: true,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		'dist/**',
		'node_modules/**',
	],
}, {
	files: ['**/*.{jsx,tsx}'],
	plugins: {
		'react-hooks': reactHooks,
	},
	rules: reactHooks.configs.recommended.rules,
});
