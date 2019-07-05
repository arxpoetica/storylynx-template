import AES from 'crypto-js/aes'
import { getToken } from '@johnny/services/auth-helpers'

export async function post(req, res) {
	try {
		const token = getToken(req.cookies.jm || req.body.cookie)
		if (token.unauthorized) { throw Error() }

		const { key } = req.body
		const ciphertext = AES.encrypt(process.env.JM_FILESTACK_API_KEY, key).toString()
		return res.json(ciphertext)
	} catch (error) {
		console.log(error)
		return res.status(401).json({ error: 1, message: 'Unauthorized' })
	}
}
