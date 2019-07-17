import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		let {
			page = 1,
			pageSize = 10,
			tags = [],
			// FIXME: will this ever be passed from a query? We need to do the same on ALL passed admin POST pages.
			status = ['PUBLISHED', 'DRAFT'],
			column = 'publishedDatetime',
			sort = 'DESC',
		} = req.body

		page = parseInt(page)
		pageSize = parseInt(pageSize)
		tags = typeof tags === 'string' ? [tags] : tags
		let where = ''
		if (status.length || tags.length) {
			where = 'where: { AND: ['
			if (status.length) {
				where += '{ OR: ['
				where += status.map(stat => `{ status: ${stat} }`).join(' ')
				where += '] }'
			}
			where += tags.length ? tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(' ') : ''
			where += '] }'
		}

		const query = `{
			articles(
				first: ${pageSize}
				skip: ${(page - 1) * pageSize}
				${where}
				orderBy: ${column}_${sort.toUpperCase()}
			) {
				id
				status
				publishedDatetime
				title
				summary
				assets { id url summary handle fileName }
				tags { tag }
			}

			articlesConnection${where ? '(' + where + ')' : ''} { aggregate { count } }
		}`
		// console.log(query)
		const { articles, articlesConnection } = await cmsQuery(query)

		res.json({
			pageSize,
			items: articles,
			itemsCount: articlesConnection.aggregate.count,
		})

	} catch (error) {
		return handleError(error, res)
	}

}
