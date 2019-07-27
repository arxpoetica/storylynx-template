import { handleError } from '@johnny/utils/loaders.js'

export async function get(req, res) {
	try {
		res.clearCookie('jm')
		return res.json({ loggedOut: true })
	} catch (error) {
		return handleError(error, res)
	}
}
