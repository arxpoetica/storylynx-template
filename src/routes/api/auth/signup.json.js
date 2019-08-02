import bcrypt from 'bcryptjs'
import { handleError, cmsMutate } from '@johnny/utils/loaders.js'
import { getToken, setToken } from '@johnny/services/auth-helpers.js'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (!token.unauthorized) { throw Error('Unauthorized') }

		const {
			username,
			password,
			role = 'user', // user, editor, admin ???
			// firstName,
			// lastName,
			// avatar,
		} = req.body

		// username should have more robust check, but this'll work for now...
		if (typeof username !== 'string' || username.length < 3) {
			throw Error('Username must be at least 3 characters.')
		}
		// NOTE: only a basic check here...
		// normally protect against injection attacks, etc...
		if (typeof password !== 'string' || password.length < 20) {
			throw Error('Password must be at least 20 characters.')
		}

		// FIXME: salt this -- in a more secure auth example, we would salt with a
		// unique imprint and store on the user or somewhere safe
		const hash = await bcrypt.hash(password, 10)


		let data = ''
		data += `username: "${username}" `
		data += `hash: "${hash}" `
		data += `role: "${role}" `
		// data += firstName ? `firstName: "${firstName}"` : ''
		// data += lastName ? `lastName: "${lastName}"` : ''
		// data += avatar ? `avatar: "${avatar}"` : ''

		// NOTE: because of unique constraint on username fields, this
		// simulataneously checks if user exists, which I can then throw
		// an error against.
		const mutation = `mutation {
			createAccount(
				data: { ${data} }
			) {
				username
				role
				firstName
				lastName
				avatar
			}
		}`
		const answer = await cmsMutate(mutation)
		if (answer.error) {
			if (answer.message.indexOf('A unique constraint would be violated on Account') > -1) {
				throw Error(`User ${username} already exists.`)
			} else {
				throw Error('Something went wrong. Please contact the code test taker 😆.')
			}
		}

		const account = answer.createAccount
		const payload = {
			username: account.username,
			role: account.role,
			firstName: account.firstName,
			lastName: account.lastName,
			avatar: account.avatar,
		}
		setToken(payload, res)
		return res.json(payload)

	} catch (error) {
		return handleError(error, res)
	}

}
