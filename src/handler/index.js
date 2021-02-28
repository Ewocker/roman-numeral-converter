import intToRomanNumeral from '../service/intToRomanNumeral'
import cache from '../model/cache'
import log from '../util/logger'
import ValidationError from '../util/validationError'

/**
 * romanNumeralHandler handles the requests to path /romannumeral
 * 
 * @param {object} queryObj - queryObj is the query string received from request, must be in object format
 * @return {[object, int]}  - returns a tuple 1) an object with field input, output and (optional) error, 
 * 																						2) http status code 
 */
export const romanNumeralHandler = async (queryObj) => {
	let res = { input: '', output: '' }
	let status = 200
	if (!('query' in queryObj)) {
		res.error = new ValidationError('Input must be included in query string. Ex. /romannumeral?query=123').toString()
		status = 400
	} else {
		res.input = queryObj.query
		const key = `romanNumeralHandler:${res.input}`
		const output = await cache.get(key)
		if (output) {
			res.output = output
			log.debug(`cache hit for key: ${key} val: ${output}`)
			return [res, status]
		}
		try {
			res.output = intToRomanNumeral(res.input)
			cache.set(`${key}`, res.output)
		} catch (err) {
			switch (true) {
			case err instanceof ValidationError:
				status = 400
				break
			default:
				status = 500
				break
			}
			res.error = err.toString()
		}
	}
	return [res, status]
}