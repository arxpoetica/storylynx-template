const firebase = require('firebase/app')
require('firebase/auth')
let auth
let isSetup = false

export default async() => {
	if (isSetup) {
		return auth
	}
	firebase.initializeApp({
		apiKey: process.env.JM_FIREBASE_API_KEY,
		authDomain: 'johnny-miller-project.firebaseapp.com',
		databaseURL: 'https://johnny-miller-project.firebaseio.com',
		projectId: 'johnny-miller-project',
		storageBucket: 'johnny-miller-project.appspot.com',
		messagingSenderId: '113612889573',
		appId: '1:113612889573:web:a4e558d2e546e3af',
	})
	auth = firebase.auth()
	auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
	isSetup = true
}
