import intToRomanNumeral from '../service/intToRomanNumeral'

export const romanNumeralHandler = (queryObj) => {
	let res = { input: '', output: '' }
	if ('query' in queryObj) {
		res.input = queryObj.query
		try {
			res.output = intToRomanNumeral(queryObj.query)
		} catch (err) {
			res.error = err.toString()
		}
	} else {
		res.error = 'Input must be included in query string. Ex. /romannumeral?query=123'
	}
	return res
}