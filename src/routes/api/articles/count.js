import { cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {
	try {
		const { articlesConnection } = await cmsQuery(`{
			articlesConnection(where: {
				status: PUBLISHED
			}) { aggregate { count } }
		}`)
		res.json({ itemsCount: articlesConnection.aggregate.count })
	} catch (error) {
		console.log(error)
		res.json({ error: 1, message: error.message })
	}
}
