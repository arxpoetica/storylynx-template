import { cmsQuery } from 'storylynx/utils/loaders'

export async function post(req, res) {
	try {
		const { resource } = await cmsQuery(`{
			resource(where: { slug: "${req.body.slug}" }) {
				id
				publishedDatetime
				title
				summary
				detail { html }
				assets { id url summary handle fileName width height mimeType }
				assetLinks {
					summary
					link
					cover { url handle }
				}
				tags { tag }
				contentType
				year
				subject
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
