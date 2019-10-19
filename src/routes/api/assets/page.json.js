import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {

		let { page, pageSize, tags } = req.body
		page = parseInt(page || 1)
		pageSize = parseInt(pageSize || 9) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		let where
		if (tags && tags.length) {
			where = '{ AND: [{ status: PUBLISHED }, '
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
			where += '] }'
		} else {
			where = '{ status: PUBLISHED }'
		}

		const { resources, resourcesConnection } = await cmsQuery(`{
			resources(
				first: ${pageSize},
				skip: ${(page - 1) * pageSize},
				where: ${where},
				orderBy: publishedDatetime_DESC
			) {
				id
				publishedDatetime
				title
				slug
				summary
				assets { id url summary handle mimeType fileName }
				externalAssets
				tags { tag }
			}

			resourcesConnection(where: ${where}) { aggregate { count } }
		}`)

		return res.json({
			pageSize,
			items: resources,
			itemsCount: resourcesConnection.aggregate.count,
		})

	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}