module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: ['airbnb-base', 'prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018
	},
	plugins: ['prettier'],
	rules: {
		'no-unused-vars': ['warn'],
		'global-require': ['off'],
		'import/order': ['off']
	}
};
