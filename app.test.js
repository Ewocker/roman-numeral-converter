const { expect } = require('@jest/globals')
const { intToRomanNumeral } = require('./app.js')

describe('test intToRomanNumeral', () => {
  it.each`
    input   | expected
    ${3999} | ${'MMMCMXCIX'}
    ${3998} | ${'MMMCMXCVIII'}
    ${1234} | ${'MCCXXXIV'}
    ${45}   | ${'XLV'}
  `('should return $expected for input $input', ({input, expected}) => expect(intToRomanNumeral(input)).toEqual(expected))
})