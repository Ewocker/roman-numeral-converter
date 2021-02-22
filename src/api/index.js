import intToRomanNumeral from '../service/intToRomanNumeral'
import cache from '../model/cache'
import log from '../util/logger'

/**
 * romanNumeralHandler handles the requests to path /romannumeral
 * 
 * @param {object} queryObj - queryObj is the query string received from request, must be in object format
 * @return {object}         - returns an object with field input, output and (optional) error.  
 */
export const romanNumeralHandler = async (queryObj) => {
	let res = { input: '', output: '' }
	if (!('query' in queryObj)) {
		res.error = 'Input must be included in query string. Ex. /romannumeral?query=123'
		return res
	}

	res.input = queryObj.query
	const key = `romanNumeralHandler:${res.input}`
	const output = await cache.get(key)
	if (output) {
		res.output = output
		log.debug(`cache hit for key: ${key} val: ${output}`)
		return res
	}
	try {
		res.output = intToRomanNumeral(res.input)
		cache.set(`${key}`, res.output)
	} catch (err) {
		res.error = err.toString()
	}
	return res
}