import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'
import { createWhere } from '@johnny/utils/api-utils'

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

		const resourcesWhere = createWhere({ status, tags })
		const draftWhere = createWhere({ status: ['DRAFT'] })
		const publishedWhere = createWhere({ status: ['PUBLISHED'] })
		const archivedWhere = createWhere({ status: ['ARCHIVED'] })

		const query = `{
			resources(
				first: ${pageSize}
				skip: ${(page - 1) * pageSize}
				${resourcesWhere}
				orderBy: ${column}_${sort.toUpperCase()}
			) {
				id
				status
				publishedDatetime
				title
				summary
				html
				assets { id url summary handle fileName }
				externalAssets
				tags { tag }
			}

			drafts: resourcesConnection(${draftWhere}) { aggregate { count } }
			published: resourcesConnection(${publishedWhere}) { aggregate { count } }
			archived: resourcesConnection(${archivedWhere}) { aggregate { count } }
		}`
		// console.log(query)
		const { resources, drafts, published, archived } = await cmsQuery(query)

		res.json({
			pageSize,
			items: resources,
			itemsCount: drafts.aggregate.count + published.aggregate.count + archived.aggregate.count,
			draftsCount: drafts.aggregate.count,
			publishedCount: published.aggregate.count,
			archivedCount: archived.aggregate.count,
		})

	} catch (error) {
		return handleError(error, res)
	}

}
