const { expect } = require('@jest/globals')
const { intToRomanNumeral } = require('./app.js')

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
})
