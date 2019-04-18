import { cmsQuery } from '../../_server/utils/loaders'

export async function get(req, res) {

	try {
		const { articles } = await cmsQuery(`{
			articles(where: { status: PUBLISHED }) {
				id
				createdAt
				title
				content { text }
				summary
				cover { url attribution }
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
