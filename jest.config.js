module.exports = {
	'transform': {
		'\\.m?jsx?$': 'jest-esm-transformer'
	},
	'modulePathIgnorePatterns': [
		'./src'
	],
	'testEnvironment': 'node'
}