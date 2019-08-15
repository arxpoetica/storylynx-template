import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		let { sort = 'DESC' } = req.body

		const query = `{
			accounts(orderBy: username_${sort.toUpperCase()}) {
				username
				role
				firstName
				lastName
				avatar { url summary handle }
			}
			accountsConnection { aggregate {count} }
		}`
		// console.log(query)
		const { accounts, accountsConnection } = await cmsQuery(query)

		res.json({
			items: accounts,
			itemsCount: accountsConnection.aggregate.count,
		})

	} catch (error) {
		return handleError(error, res)
	}

}
