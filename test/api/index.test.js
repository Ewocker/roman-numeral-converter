import { expect } from '@jest/globals'
import axios from 'axios'

const URL = process.env.URL ? process.env.URL : 'http://localhost:8080' 

describe('Test /romannumeral', () => {
	const largeIn = '-'.repeat(2048) // max length of query string
	it.each`
    input      | output         | error
    ${1}       | ${'I'}         | ${''}
		${440}     | ${'CDXL'}      | ${''}
		${3999}    | ${'MMMCMXCIX'} | ${''}
		${0}       | ${''}          | ${'Parameter must be in range of 1-3999'}
		${4000}    | ${''}          | ${'Parameter must be in range of 1-3999'}
		${''}      | ${''}          | ${'Parameter is not a integer number'}
		${'x'}     | ${''}          | ${'Parameter is not a integer number'}
		${'x123'}  | ${''}          | ${'Parameter is not a integer number'}
		${'_!~A@$'}| ${''}          | ${'Parameter is not a integer number'}
		${largeIn} | ${''}          | ${'Parameter is not a integer number'}
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

	it.each`
	  query     | input    | output         | error
		${''}     | ${''}    | ${''}          | ${'Input must be included in query string. Ex. /romannumeral?query=123'}
		${''}     | ${'x'}   | ${''}          | ${'Input must be included in query string. Ex. /romannumeral?query=123'}
		${'test'} | ${''}    | ${''}          | ${'Input must be included in query string. Ex. /romannumeral?query=123'}
		${'test'} | ${'x'}   | ${''}          | ${'Input must be included in query string. Ex. /romannumeral?query=123'}
	`('should return expected output: "$output", error "$error" for query "?$query=$input"', async ({query, input, output, error}) => {
		const data = await axios.get(
			`${URL}/romannumeral?${query}=${input}`,
			{ transformResponse: r => r } // remove axios auto parsing
		)
		let expectedRes = `{\n  "input": "${input}",\n  "output": "${output}"\n}`
		if (error !== '') {
			expectedRes = `{\n  "input": "",\n  "output": "${output}",\n  "error": "${error}"\n}`
		}
		expect(data.data).toEqual(expectedRes)
	})
})