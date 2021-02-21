import { expect } from '@jest/globals'
import intToRomanNumeral from '../../src/service/intToRomanNumeral'

describe('test intToRomanNumeral', () => {
	it.each`
    input   | expected
    ${1}    | ${'I'}
    ${2}    | ${'II'}
    ${3}    | ${'III'}
    ${4}    | ${'IV'}
    ${5}    | ${'V'}
    ${6}    | ${'VI'}
    ${7}    | ${'VII'}
    ${8}    | ${'VIII'}
    ${9}    | ${'IX'}
    ${45}   | ${'XLV'}
    ${46}   | ${'XLVI'}
    ${47}   | ${'XLVII'}
    ${48}   | ${'XLVIII'}
    ${49}   | ${'XLIX'}
    ${50}   | ${'L'}
    ${51}   | ${'LI'}
    ${52}   | ${'LII'}
    ${53}   | ${'LIII'}
    ${54}   | ${'LIV'}
    ${55}   | ${'LV'}
    ${440}  | ${'CDXL'}
    ${441}  | ${'CDXLI'}
    ${442}  | ${'CDXLII'}
    ${443}  | ${'CDXLIII'}
    ${444}  | ${'CDXLIV'}
    ${445}  | ${'CDXLV'}
    ${446}  | ${'CDXLVI'}
    ${447}  | ${'CDXLVII'}
    ${448}  | ${'CDXLVIII'}
    ${449}  | ${'CDXLIX'}
    ${450}  | ${'CDL'}
    ${996}  | ${'CMXCVI'}
    ${997}  | ${'CMXCVII'}
    ${998}  | ${'CMXCVIII'}
    ${999}  | ${'CMXCIX'}
    ${1000} | ${'M'}
    ${1001} | ${'MI'}
    ${1002} | ${'MII'}
    ${1003} | ${'MIII'}
    ${1004} | ${'MIV'}
    ${2000} | ${'MM'}
    ${3990} | ${'MMMCMXC'}
    ${3991} | ${'MMMCMXCI'}
    ${3992} | ${'MMMCMXCII'}
    ${3993} | ${'MMMCMXCIII'}
    ${3994} | ${'MMMCMXCIV'}
    ${3995} | ${'MMMCMXCV'}
    ${3996} | ${'MMMCMXCVI'}
    ${3997} | ${'MMMCMXCVII'}
    ${3998} | ${'MMMCMXCVIII'}
    ${3999} | ${'MMMCMXCIX'}
  `('should return $expected for input $input', ({ input, expected }) =>
		expect(intToRomanNumeral(input)).toEqual(expected)
	)

	it.each`
    input     | expected
    ${'1'}    | ${'I'}
    ${'3999'} | ${'MMMCMXCIX'}
  `('should return $expected for string input "$input"', ({ input, expected }) =>
		expect(intToRomanNumeral(input)).toEqual(expected)
	)

	it.each`
    input
    ${0}
    ${4000}
    ${'0'}
    ${'4000'}
  `('should throw error for input $input', ({ input }) =>
		expect(() => intToRomanNumeral(input)).toThrow('Parameter must be in range of 1-3999')
	)

	it.each`
    input
    ${''}
    ${' '}
    ${'xxZ'}
    ${'x123'}
    ${'0cmnwe02314'}
    ${'4000  '}
    ${'     _ 4000  '}
    ${'  """&530   _ 4000  '}
    ${'-2'}
    ${'+1000'}
    ${-2}
    ${'+1000'}
    ${'01'}
    ${'00100'}
    ${'03999'}
    ${'04000'}
    ${'0.2'}
    ${'2.2'}
    ${'0.2'}
    ${'6.9e+13'}
    ${'2e10'}
    ${'2e+10'}
    ${'2.2e+10'}
  `('should throw error for input $input', ({ input }) =>
		expect(() => intToRomanNumeral(input)).toThrow('Parameter is not a integer number')
	)
})
