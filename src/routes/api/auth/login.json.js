import { setToken } from '@johnny/services/auth-helpers'

export async function post(req, res) {
	try {
		const firebaseSetup = (await import('@johnny/services/firebase-setup')).default
		const auth = await firebaseSetup()

		const { username, password } = req.body
		const { user } = await auth.signInWithEmailAndPassword(username, password)
		const token = await user.getIdTokenResult()
		const payload = {
			id: user.uid,
			// displayName: user.displayName,
			// photoURL: user.photoURL,
			username: user.email,
			admin: token.claims.admin,
		}

		setToken(payload, res)
		res.json(payload)

	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })
}
