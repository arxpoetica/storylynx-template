import { cmsQuery } from '../../../_server/utils/loaders'

export async function post(req, res) {

	try {
		const page = req.body.page ? parseInt(req.body.page) : 0
		const pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 20
		const skip = page * pageSize

		const { resources, resourcesConnection } = await cmsQuery(`{

			resourcesConnection(where: { status: PUBLISHED }) { aggregate { count } }
			resources(
				first: ${pageSize},
				skip: ${skip},
				where: { status: PUBLISHED }
				orderBy: createdAt_DESC
			) {
				id
				createdAt
				title
				internalResources { id url handle mimeType }
				externalResources
				internalThumb { id url handle mimeType }
				externalThumb
				summary
				tags { tag }
			}

		}`)
		return res.json({ resources, count: resourcesConnection.aggregate.count })

	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
