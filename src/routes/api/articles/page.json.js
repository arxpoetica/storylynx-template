import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {

		let { page, pageSize, tags } = req.body
		page = parseInt(page || 1)
		pageSize = parseInt(pageSize || 3) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		let where
		if (tags && tags.length) {
			where = '{ AND: [{ status: PUBLISHED }, '
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
			where += '] }'
		} else {
			where = '{ status: PUBLISHED }'
		}

		const { articles, articlesConnection } = await cmsQuery(`{
			articles(
				first: ${pageSize},
				skip: ${(page - 1) * pageSize},
				where: ${where},
				orderBy: publishedDatetime_DESC
			) {
				id
				publishedDatetime
				title
				content { text }
				summary
				cover { url summary handle }
				tags { tag }
			}

			articlesConnection(where: ${where}) { aggregate { count } }
		}`)

		res.json({
			pageSize,
			items: articles,
			itemsCount: articlesConnection.aggregate.count,
		})

	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}

}
