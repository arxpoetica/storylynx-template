import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }
		const { articleTags } = await cmsQuery('{ articleTags { id tag } }')
		res.json({ tags: articleTags })
	} catch (error) {
		return handleError(error, res)
	}
}
