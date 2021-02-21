const validator = require('validator')
const symbol = {
	0: '',
	1: 'I',
	5: 'V',
	10: 'X',
	50: 'L',
	100: 'C',
	500: 'D',
	1000: 'M',
}

export default function intToRomanNumeral(n) {
	// validation
	if (
		!validator.isNumeric(String(n), {no_symbols: true}) ||
		typeof n === 'string' && n.length > 1 && n.charAt(0) === '0' // edge case
	) throw 'Parameter is not a integer number'
	let val = Number(n)
	if (!(1 <= val && val <= 3999 )) throw 'Parameter must be in range of 1-3999'

	// algorithm
	let res = ''
	let division = 10000
	while (val > 0) {
		division /= 10
		const firstDigit = Math.floor(val / division)

		if (firstDigit <= 3) {
			for (let c = 0; c < firstDigit; c++) res += symbol[division]
		} else if (firstDigit == 4) {
			res += symbol[division] + symbol[division * 5]
		} else if (5 <= firstDigit && firstDigit <= 8) {
			res += symbol[division * 5]
			for (let c = 0; c < firstDigit - 5; c++) res += symbol[division]
		} else {
			// firstDigit == 9
			res += symbol[division] + symbol[division * 10]
		}
		val -= firstDigit * division
	}

	return res
}
