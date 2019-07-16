import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsMutate } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { id, changes } = req.body

		let data = ''
		data += changes.status ? `status: ${changes.status} ` : ''
		data += changes.title ? `title: "${changes.title}" ` : ''
		data += changes.slug ? `slug: "${changes.slug}" ` : ''
		data += changes.html ? `html: "${changes.html}" ` : ''
		data += changes.summary ? `summary: "${changes.summary}" ` : ''
		data += changes.assets ? 'assets: { set: $assets } ' : ''
		data += changes.tags ? 'tags: { set: $tags } ' : ''

		let update = ''
		if (changes.assets || changes.tags) {
			update += 'update('
			update += changes.assets ? '$assets: [AssetWhereUniqueInput!] ' : ''
			update += changes.tags ? '$tags: [TagWhereUniqueInput!] ' : ''
			update += ')'
		}

		const mutation = `
			mutation ${update} {
				updateArticle(
					where: { id: "${id}" }
					data: { ${data} }
				) {
					id
					status
					publishedDatetime
					title
					slug
					html
					summary
					assets { id url summary handle fileName }
					tags { id tag }
				}
			}
		`
		const variables = {}
		if (changes.assets) {
			variables.assets = changes.assets.map(asset => ({ id: asset.id }))
		}
		if (changes.tags) {
			variables.tags = changes.tags.map(tag => ({ id: tag.id }))
		}

		const { updateArticle } = await cmsMutate(mutation, variables)
		return res.json(updateArticle)
	} catch (error) {
		return handleError(error, res)
	}

}
