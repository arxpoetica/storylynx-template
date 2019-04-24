import { cmsQuery } from '../../../_server/utils/loaders'

export async function post(req, res) {

	try {

		const { article } = await cmsQuery(`{
			article(where: { id: "${req.body.id}" }) {
				createdAt
				title
				content { html }
				cover { url attribution }
				tags { tag }
			}
		}`)
		res.json(article)

	} catch (error) {
		// console.log(error)
		res.json({ error: 1, message: error.message })
	}
	res.json({ error: 1, message: 'Something went wrong.' })

}
