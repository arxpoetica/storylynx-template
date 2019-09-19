import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { resource, resourceTags } = await cmsQuery(`{
			resource(where: { id: "${req.body.id}" }) {
				id
				status
				publishedDatetime
				title
				slug
				html
				summary
				assets { id url summary handle fileName }
				externalAssets
				tags { id tag }
			}
			resourceTags { id tag }
		}`)

		return res.json({ asset: resource, tags: resourceTags })
	} catch (error) {
		return handleError(error, res)
	}

}
