import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsMutate } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { changes } = req.body

		let data = ''
		data += changes.status ? `status: ${changes.status} ` : ''
		data += changes.title ? `title: "${changes.title}" ` : ''
		data += changes.slug ? `slug: "${changes.slug}" ` : ''
		data += `publishedDatetime: "${changes.publishedDatetime ? changes.publishedDatetime : (new Date()).toISOString()}" `
		data += changes.html ? `html: "${changes.html}" ` : ''
		data += changes.summary ? `summary: "${changes.summary}" ` : ''
		data += changes.assets ? 'assets: { connect: $assets } ' : ''
		data += changes.tags ? 'tags: { connect: $tags } ' : ''

		let create = ''
		if (changes.assets || changes.tags) {
			create += 'create('
			create += changes.assets ? '$assets: [AssetWhereUniqueInput!] ' : ''
			create += changes.tags ? '$tags: [ArticleTagWhereUniqueInput!] ' : ''
			create += ')'
		}

		const mutation = `
			mutation ${create} {
				createArticle( data: { ${data} } ) {
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

		const answer = await cmsMutate(mutation, variables)
		return res.json(answer.error ? answer : answer.createArticle)
	} catch (error) {
		return handleError(error, res)
	}

}
