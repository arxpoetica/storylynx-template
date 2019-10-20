import { cmsQuery } from '@johnny/utils/loaders'
import { convert_decades } from '@johnny/utils/api-utils'

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
				contentType
				decade
			}
		}`)
		// console.log(resource)
		return res.json(convert_decades([resource])[0])
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
