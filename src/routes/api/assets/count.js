import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const { articles } = await cmsQuery(`{
			articles(
				first: 3,
				# skip: 0,
				where: { status: PUBLISHED },
				orderBy: createdAt_DESC
			) {
				id
				createdAt
				title
				content { text }
				assets { url attribution handle fileName }
				tags { tag }
			}
		}`)
		return res.json(articles)

	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
