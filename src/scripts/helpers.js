import fetch from 'cross-fetch'

export const CURL = async function(url) {
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'text/html' },
		})
		return await res.text()
	} catch (error) {
		console.error(error)
		return undefined
	}
}
