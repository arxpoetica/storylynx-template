import bcrypt from 'bcryptjs'
import { handleError, cmsQuery } from '@johnny/utils/loaders.js'
import { setToken } from '@johnny/services/auth-helpers.js'

export async function post(req, res) {

	try {

		const { username, password } = req.body

		// NOTE: only a basic checks here...
		// normally protect against injection attacks, etc...
		// TODO: check that username is a correctly formatted email?????????
		if (typeof username !== 'string' || username.length < 3) {
			throw Error('Username must be at least 3 characters.')
		} else if (typeof password !== 'string' || password.length < 20) {
			throw Error('Password must be at least 20 characters.')
		}

		const query = `{
			account(where: { username: "${username}" }) {
				username
				hash
				salt
				role
				firstName
				lastName
				avatar
			}
		}`
		const answer = await cmsQuery(query)

		// further checks, including password...
		if (answer.error) {
			throw Error('Something went wrong. Please contact the code test taker 😆.')
		} else if (!answer.account) {
			return res.json({ username: false })
		}
		const { account } = answer
		// FIXME: (un)salt this
		const match = await bcrypt.compare(password, account.hash)
		if (!match) {
			throw Error('Incorrect password.')
		}

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
