import { cmsQuery } from '../../_server/utils/loaders'

export async function get(req, res) {

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
				summary
				cover { url attribution handle }
				tags { tag }
			}
		}`)
		res.json(articles)

	} catch (error) {
		// console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })

}
