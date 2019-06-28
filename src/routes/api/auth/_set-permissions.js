import * as firebase from 'firebase-admin'
import serviceAccount from '../../../build/firebase.json'
firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: process.env.JM_FIREBASE_ENDPOINT,
})
const auth = firebase.auth()

export async function get(req, res) {
	try {
		// await auth.setCustomUserClaims(someUserId, { admin: true })
		// await auth.setCustomUserClaims(someUserId, { editor: true })
		const userRecord = await auth.getUser(someUserId)
		const user = userRecord.toJSON()
		res.json({ user })
	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })
}
