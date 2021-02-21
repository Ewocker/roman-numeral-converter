import intToRomanNumeral from '../service/intToRomanNumeral'
import Cache from '../model/cache'

const cache = new Cache()

export const romanNumeralHandler = async (queryObj) => {
	let res = { input: '', output: '' }
	if (!('query' in queryObj)) {
		res.error = 'Input must be included in query string. Ex. /romannumeral?query=123'
		return res
	}

	res.input = queryObj.query
	const output = await cache.get(res.input)
	if (output) {
		res.output = output
		console.log(`cache hit for key: ${res.input} val: ${output}`)
		return res
	}
	try {
		res.output = intToRomanNumeral(res.input)
		cache.set(res.input, res.output)
	} catch (err) {
		res.error = err.toString()
	}
	return res
}