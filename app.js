

/**
 * IntToRomanNumeral converts integer to Roman numeral.
 *
 * @param {number} n - n must be a positive integer.
 * @return {string} 
 *
 * @example
 *
 *     foo('hello')
 */
const intToRomanNumeral = (n) => {
  // TODO error handling
  // if (!Number.isInteger(n)) {
  //   return 
  // }

  // symbol (val) I   V   X   L   C	  D	  M
  //        (key) 1   5   10	50	100	500	1000
  // Algorithm: 
  //  if firstDigit <= 3
  //    symbol[division] * firstDigit
  //  elif firstDigit == 4
  //    symbol[division] + symbol[division * 5]
  //  elif 5 <= firstDigit <=8
  //    symbol[division * 5] + (symbol[division] * (firstDigit-5))
  //  elif firstDigit == 9
  //    symbol[division] + symbol[division*10]

  const symbol = {
    '0': '',
    '1': 'I',
    '5': 'V',
    '10': 'X',
    '50': 'L',
    '100': 'C',
    '500': 'D',
    '1000': 'M'
  }

  let res = ''
  let division = 1
  while (n >= division) {
    division *= 10
  }

  let val = n
  while (val > 0) {
    division /= 10
    const firstDigit = Math.floor(val/division)

    console.log(val)
    console.log(division)
    console.log(firstDigit)
    if (firstDigit <= 3) {
      for (let c = 0; c < firstDigit; c++)
        res += symbol[division]
    } else if (firstDigit == 4) {
      res += symbol[division] + symbol[division*5]
    } else if (5 <= firstDigit && firstDigit <= 8) {
      res += symbol[division*5]
      for (let c = 0; c < (firstDigit - 5); c++)
        res += symbol[division]
    } else { // firstDigit == 9
      res += symbol[division] + symbol[division*10]
    }
    val -= firstDigit*division
  }

  return res
}

console.log(intToRomanNumeral(2000))