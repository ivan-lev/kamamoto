import antfu from '@antfu/eslint-config';

export default antfu({
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: true,
	},

	rules: {
		'eslint-comments/no-unlimited-disable': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
		'regexp/no-obscure-range': ['error', { allowed: ['alphanumeric', 'а-я'] }],
		// any у ошибки отключает проверку типов: опечатка вроде error.messagr молча даёт undefined.
		// Без аннотации переменная в catch — unknown; для текста ошибки есть getErrorMessage.
		// Первые два селектора — дефолт antfu, правило перезаписывает его целиком
		'no-restricted-syntax': ['error', 'TSEnumDeclaration[const=true]', 'TSExportAssignment', {
			selector: 'CatchClause[param.typeAnnotation.typeAnnotation.type="TSAnyKeyword"]',
			message: 'Не типизируйте ошибку как any: без аннотации она unknown',
		}, {
			selector: 'CallExpression[callee.property.name="catch"] > :function[params.0.typeAnnotation.typeAnnotation.type="TSAnyKeyword"]',
			message: 'Не типизируйте ошибку как any: используйте unknown',
		}],
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
