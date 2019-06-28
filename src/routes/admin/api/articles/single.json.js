import { cmsQuery } from '@johnny/utils/loaders'
import { getToken } from '@johnny/services/auth-helpers'

export async function post(req, res) {

	try {
		const token = getToken(req.cookies.jm || req.body.cookie)
		if (token.unauthorized) { throw Error() }

		const { article } = await cmsQuery(`{
			article(where: { id: "${req.body.id}" }) {
				publishedDatetime
				title
				slug
				content { html }
				summary
				cover { url summary handle }
				tags { tag }
			}
		}`)
		res.json({ article })
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: 1, message: 'Unauthorized' })
	}

}
