import { cmsQuery } from '../../../server/utils/loaders'

export async function post(req, res) {

	try {

		let { page, pagesize, tags } = req.body
		page = page || 0
		pagesize = pagesize || 20

		let where
		if (Array.isArray(tags) && tags.length) {
			where = '{ AND: [{ status: PUBLISHED }, '
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
			where += '] }'
		} else {
			where = '{ status: PUBLISHED }'
		}

		const { articles } = await cmsQuery(`{
			articles(
				first: ${pagesize},
				skip: ${page},
				where: ${where},
				orderBy: createdAt_DESC
			) {
				id
				createdAt
				title
				content { text }
				summary
				cover { url summary handle }
				tags { tag }
			}
		}`)

		res.json(articles)

	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}

}
