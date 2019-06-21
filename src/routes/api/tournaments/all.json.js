import combined from './_raw-data/combined'

export async function get(req, res) {
	try {
		res.json({ tournaments: combined })
	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })
}
