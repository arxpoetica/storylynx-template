import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const { article } = await cmsQuery(`{
			article(where: { id: "${req.body.id}" }) {
				publishedDatetime
				title
				html
				assets { id url summary handle }
				tags { tag }
			}
		}`)
		return res.json(article)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
