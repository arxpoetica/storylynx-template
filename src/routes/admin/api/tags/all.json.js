import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }
		const { tags } = await cmsQuery('{ tags { id tag } }')
		res.json({ tags })
	} catch (error) {
		return handleError(error, res)
	}
}
