import { cmsMutate } from '@johnny/utils/loaders'
import { getToken } from '@johnny/services/auth-helpers'

export async function post(req, res) {

	try {
		const token = getToken(req.cookies.jm || req.body.cookie)
		if (token.unauthorized) { throw Error() }

		const { id, changes } = req.body

		let data = ''
		data += changes.title ? `title: "${changes.title}" ` : ''
		data += changes.slug ? `slug: "${changes.slug}" ` : ''
		data += changes.html ? `html: "${changes.html}" ` : ''
		data += changes.summary ? `summary: "${changes.summary}" ` : ''
		data += changes.tags ? 'tags: { set: $set } ' : ''

		const mutation = `
			mutation update( $set: [TagWhereUniqueInput!] ) {
				updateArticle(
					where: { id: "${id}" }
					data: { ${data} }
				) {
					id
					publishedDatetime
					title
					slug
					html
					summary
					cover { url summary handle }
					tags { id tag }
				}
			}
		`
		const variables = {}
		if (changes.tags) {
			variables.set = changes.tags.map(tag => ({ id: tag.id }))
		}

		const { updateArticle } = await cmsMutate(mutation, variables)
		return res.json(updateArticle)
	} catch (error) {
		console.log(error)
		return res.status(401).json({ error: 1, message: 'Unauthorized' })
	}

}
