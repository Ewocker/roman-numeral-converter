import { expect } from '@jest/globals'
import axios from 'axios'

const baseURL = process.env.URL ? process.env.URL : 'http://localhost:8080' 
const api = axios.create({
	baseURL,
	timeout: 1000,
	transformResponse: r => r
})


describe('Test /romannumeral', () => {
	const largeIn = '-'.repeat(2048) // max length of query string
	it.each`
	  input      | output         | error                                     | status
	  ${1}       | ${'I'}         | ${''}                                     | ${200}
		${440}     | ${'CDXL'}      | ${''}                                     | ${200}
		${3999}    | ${'MMMCMXCIX'} | ${''}                                     | ${200}
		${0}       | ${''}          | ${'ValidationError: Parameter must be in range of 1-3999'} | ${400}
		${4000}    | ${''}          | ${'ValidationError: Parameter must be in range of 1-3999'} | ${400}
		${''}      | ${''}          | ${'ValidationError: Parameter is not a integer number'}    | ${400}
		${'x'}     | ${''}          | ${'ValidationError: Parameter is not a integer number'}    | ${400}
		${'x123'}  | ${''}          | ${'ValidationError: Parameter is not a integer number'}    | ${400}
		${'_!~A@$'}| ${''}          | ${'ValidationError: Parameter is not a integer number'}    | ${400}
		${largeIn} | ${''}          | ${'ValidationError: Parameter is not a integer number'}    | ${400}
  `('should return expected output: "$output", error "$error" for input "$input" with statusCode "$status"',
	 async ({ input, output, error, status}) => {
			let expectedRes = `{\n  "input": "${input}",\n  "output": "${output}"\n}`
			if (error !== '') {
				expectedRes = `{\n  "input": "${input}",\n  "output": "${output}",\n  "error": "${error}"\n}`
			}

			let data, resStatus
			try {
				const res = await api.get(`/romannumeral?query=${input}`)
				data = res.data
				resStatus = res.status
			} catch (err) {
				data = err.response.data
				resStatus = err.response.status
			}

			expect(data).toEqual(expectedRes)
			expect(resStatus).toEqual(status)
		})

	it.each`
	  query     | input    | output | error
		${''}     | ${''}    | ${''}  | ${'ValidationError: Input must be included in query string. Ex. /romannumeral?query=123'}
		${''}     | ${'x'}   | ${''}  | ${'ValidationError: Input must be included in query string. Ex. /romannumeral?query=123'}
		${'test'} | ${''}    | ${''}  | ${'ValidationError: Input must be included in query string. Ex. /romannumeral?query=123'}
		${'test'} | ${'x'}   | ${''}  | ${'ValidationError: Input must be included in query string. Ex. /romannumeral?query=123'}
	`('should return expected output: "$output", error "$error" for query "?$query=$input"', async ({query, input, output, error}) => {
		const	expectedRes = `{\n  "input": "",\n  "output": "${output}",\n  "error": "${error}"\n}`
		let data, resStatus
		try {
			const res = await api.get(`/romannumeral?${query}=${input}`)
		} catch (err) {
			data = err.response.data
			resStatus = err.response.status
		}
		expect(data).toEqual(expectedRes)
		expect(resStatus).toEqual(400)
	})

	it.each`
	  type                  | error 									 | status
		${'*/*'}              | ${''} 									 | ${200}
		${'application/json'} | ${''} 									 | ${200}
		${'application/yaml'} | ${'406 Not Acceptable'} | ${406}
	`('should return status "$status" for type "$type" with with error="$error"', async ({type, error, status}) => {
		let	expectedRes = '{\n  "input": "1",\n  "output": "I"\n}'
		if (error !== '') {
			expectedRes = error
		}
		let data, resStatus
		try {
			const res = await api.get('/romannumeral?query=1', { headers: { Accept: type } })
			data = res.data 
			resStatus = res.status
		} catch (err) {
			data = err.response.data
			resStatus = err.response.status
		}
		expect(data).toEqual(expectedRes)
		expect(resStatus).toEqual(status)
	})
})
