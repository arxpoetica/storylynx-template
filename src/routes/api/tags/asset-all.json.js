import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function get(req, res) {
	try {
		const { resourceTags } = await cmsQuery('{ resourceTags { id tag } }')
		res.json({ tags: resourceTags })
	} catch (error) {
		return handleError(error, res)
	}
}
