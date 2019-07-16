import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {

		const { article } = await cmsQuery(`{
			article(where: { id: "${req.body.id}" }) {
				createdAt
				title
				content { html }
				assets { id url summary handle fileName }
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
