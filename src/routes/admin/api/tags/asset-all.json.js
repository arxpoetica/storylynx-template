import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }
		const { resourceTags } = await cmsQuery('{ resourceTags { id tag } }')
		res.json({ tags: resourceTags })
	} catch (error) {
		return handleError(error, res)
	}
}
