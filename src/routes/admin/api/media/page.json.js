import { getToken } from '@johnny/services/auth-helpers'
import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error() }

		let { page, pageSize, tags } = req.body
		page = parseInt(page || 1)
		pageSize = parseInt(pageSize || 10) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		let where = 'where:'
		if (tags && tags.length) {
			where = '{ AND: [ '
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
			where += '] }'
		} else {
			where += '{}'
		}

		const { assets, assetsConnection } = await cmsQuery(`{
			assets(
				first: ${pageSize}
				skip: ${(page - 1) * pageSize}
				${where}
				orderBy: fileName_ASC
			) {
				id
				url
				handle
				fileName
			}

			assetsConnection(${where}) { aggregate { count } }
		}`)

		res.json({
			pageSize,
			items: assets,
			itemsCount: assetsConnection.aggregate.count,
		})

	} catch (error) {
		console.log(error)
		return res.status(401).json({ error: 1, message: 'Unauthorized' })
	}

}
