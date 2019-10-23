import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const { resource } = await cmsQuery(`{
			resource(where: { slug: "${req.body.slug}" }) {
				publishedDatetime
				title
				content
				assets { id url summary handle fileName width height }
				externalAssets
				tags { tag }
				contentType
				year
				source
			}
		}`)
		// console.log(resource)
		return res.json(resource)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
