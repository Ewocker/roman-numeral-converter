exports.intToRomanNumeral = (n) => {
  // TODO error handling
  // if (!Number.isInteger(n)) {
  //   return 
  // }

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
