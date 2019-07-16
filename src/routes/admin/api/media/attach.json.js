import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsMutate } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { assets = [] } = req.body
		const items = []

		for (let asset of assets) {
			const { handle, fileName, size, mimeType } = asset
			const res = await cmsMutate(`mutation uploadAsset {
				createAsset(data: {
					handle: "${handle}"
					fileName: "${fileName}"
					size: ${size}
					mimeType: "${mimeType}"
					status: PUBLISHED
				}) {
					id
					url
					handle
					fileName
				}
			}`)
			if (res.error) {
				throw Error(res.message)
			}
			items.push(res.createAsset)
		}
		res.json({ items, itemsCount: items.length })

	} catch (error) {
		return handleError(error, res)
	}

}
