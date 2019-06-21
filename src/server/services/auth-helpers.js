import jwt from 'jsonwebtoken'
const prod = process.env.NODE_ENV === 'production'

export const getToken = req => {
	try {
		return jwt.verify(req.cookies.jm, process.env.JM_JWT_SECRET)
	} catch (error) {
		return {
			unauthorized: true,
			message: 'Unauthorized',
		}
	}
}

export const setToken = (payload, res) => {
	try {
		const month = 1000 * 60 * 60 * 24 * 30
		const token = jwt.sign(payload, process.env.JM_JWT_SECRET, { expiresIn: month })
		return res.cookie('fudi', token, {
			httpOnly: true,
			secure: prod,
			maxAge: month,
		})
	} catch (error) {
		console.log(error)
	}
}

export const jwtFlash = function(req, res, next) {
	req.flash = flash => {
		const oneHour = 1000 * 60 * 60
		res.cookie('fudiflash', flash, {
			httpOnly: true,
			secure: prod,
			maxAge: oneHour,
		})
	}
	if (req.cookies.fudiflash) {
		res.clearCookie('fudiflash', {
			httpOnly: true,
			secure: prod,
			maxAge: 0,
		})
	}
	next()
}
