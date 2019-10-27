import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {

		let { page, pageSize, tags, type, decade, subject } = req.body
		page = parseInt(page || 1)
		pageSize = parseInt(pageSize || 9) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		let where = '{ AND: ['
		where += '{ status: PUBLISHED }'
		if (tags && tags.length) {
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(' ')
		}
		if (type) {
			where += ` { contentType: ${type} }`
		}
		if (decade) {
			where += ` { year_gte: ${parseInt(decade)} }`
			where += ` { year_lt: ${parseInt(decade) + 10} }`
		}
		if (subject) {
			where += ` { subject: ${subject} }`
		}
		where += '] }'

		const {
			resources,
			resourcesConnection,
			content_types,
			subjects,
		} = await cmsQuery(`{
			resources(
				first: ${pageSize},
				skip: ${(page - 1) * pageSize},
				where: ${where},
				orderBy: publishedDatetime_DESC
			) {
				id
				publishedDatetime
				title
				slug
				assets { id url summary handle mimeType fileName }
				externalAssets
				contentType
				year
				subject
			}

			resourcesConnection(where: ${where}) { aggregate { count } }
			content_types: __type(name: "ContentTypes") { enumValues { name } }
			subjects: __type(name: "Subjects") { enumValues { name } }
		}`)

		return res.json({
			pageSize,
			items: resources,
			itemsCount: resourcesConnection.aggregate.count,
			content_types: content_types.enumValues.map(val => val.name),
			subjects: subjects.enumValues.map(val => val.name),
		})

	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
