import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsMutate } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { ids } = req.body
		const concatenatedIds = ids.map(id => `"${id}"`).join(', ')
		const mutation = `
			mutation {
				deleteManyArticles(where: {
					id_in: [${concatenatedIds}]
				}) { count }
			}
		`
		const answer = await cmsMutate(mutation)
		return res.json(answer.error ? answer : answer.deleteManyArticles)
	} catch (error) {
		return handleError(error, res)
	}

}
