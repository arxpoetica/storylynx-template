import { yellow } from 'ansi-colors'
import jwt from 'jsonwebtoken'
const prod = process.env.NODE_ENV === 'production'

export const getToken = req => {
	try {
		const token = req.cookies.lynx || req.body.cookie
		if (!token) { throw Error('No JWT token. Unauthorized.') }
		return jwt.verify(token, process.env.LYNX_JWT_SECRET)
	} catch (error) {
		console.log(yellow(error.message))
		return {
			unauthorized: true,
			message: 'Unauthorized',
		}
	}
}

export const setToken = (payload, res) => {
	try {
		const month = 1000 * 60 * 60 * 24 * 30
		const token = jwt.sign(payload, process.env.LYNX_JWT_SECRET, { expiresIn: month })
		return res.cookie('lynx', token, {
			httpOnly: true,
			secure: prod,
			maxAge: month,
		})
	} catch (error) {
		console.log(error)
	}
}
