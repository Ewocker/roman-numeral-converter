import { expect } from '@jest/globals'
import axios from 'axios'

// TODO Read froim config
const URL = process.env.URL ? process.env.URL : 'http://localhost:8080' 

describe('basic API test', () => {
	it.each`
    input   | output         | error
    ${1}    | ${'I'}         | ${''}
		${440}  | ${'CDXL'}      | ${''}
		${3999} | ${'MMMCMXCIX'} | ${''}
		${0} | ${''}          | ${'Parameter must be in range of 1-3999'}
		${4000} | ${''}          | ${'Parameter must be in range of 1-3999'}
		${'x'}  | ${''}          | ${'Parameter is not a integer number'}
		${'x123'}  | ${''}          | ${'Parameter is not a integer number'}
  `('should return expected output: "$output", error "$error" for input "$input"', async ({ input, output, error}) => {
		const data = await axios.get(
			`${URL}/romannumeral?query=${input}`,
			{ transformResponse: r => r } // remove axios auto parsing
		)
		let expectedRes = `{\n  "input": "${input}",\n  "output": "${output}"\n}`
		if (error !== '') {
			expectedRes = `{\n  "input": "${input}",\n  "output": "${output}",\n  "error": "${error}"\n}`
		}
		expect(data.data).toEqual(expectedRes)
	})
})