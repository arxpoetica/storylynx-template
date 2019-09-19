import AES from 'crypto-js/aes'
import { getToken } from '@johnny/services/auth-helpers'
import { handleError } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { key } = req.body
		const ciphertext = AES.encrypt(process.env.JM_FILESTACK_API_KEY, key).toString()
		return res.json(ciphertext)
	} catch (error) {
		return handleError(error, res)
	}
}
