export async function post(req, res) {
	try {
		res.clearCookie('jm')
		res.json({ loggedOut: true })
	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })
}
