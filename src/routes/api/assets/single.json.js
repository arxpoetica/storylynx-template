import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const { resource } = await cmsQuery(`{
			resource(where: { slug: "${req.body.slug}" }) {
				publishedDatetime
				title
				html
				assets { id url summary handle fileName }
				externalAssets
				tags { tag }
			}
		}`)
		// console.log(resource)
		return res.json(resource)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
