export async function post(req, res) {
	try {
		// const firebaseSetup = (await import('../../../server/services/firebase-setup')).default
		// const auth = await firebaseSetup()
		// auth.signOut()
		res.clearCookie('jm')
		res.json({ loggedOut: true })
	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })
}
