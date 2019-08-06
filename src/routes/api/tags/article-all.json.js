import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function get(req, res) {
	try {
		const { articleTags } = await cmsQuery('{ articleTags { id tag } }')
		res.json({ tags: articleTags })
	} catch (error) {
		return handleError(error, res)
	}
}
