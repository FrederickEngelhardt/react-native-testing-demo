module.exports = {
	root: true,
	extends: ['@react-native-community', 'prettier'],
	plugins: ['react', 'react-native', 'prettier'],
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
	globals: {
		__DEV__: false,
		jasmine: false,
		beforeAll: false,
		afterAll: false,
		beforeEach: false,
		afterEach: false,
		test: false,
		expect: false,
		describe: false,
		jest: false,
		it: false,
	},
	rules: {
		'no-tabs': 0,
		indent: ['error', 'tab'],
		'comma-dangle': 0,
		'no-unused-vars': 0,
		'no-undef': 0,
		quotes: 0,
		'react/no-unescaped-entities': 0,
		'react-native/no-raw-text': 0,
		'space-before-function-paren': 0,
	},
}
