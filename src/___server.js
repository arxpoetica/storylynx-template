// app.use(sirv(`src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/static`, { development }))

// app.use(sapper.middleware({
// 	session: req => {
// 		const token = getToken(req)
// 		return {
// 			user: token.unauthorized ? null : token,
// 			cookie: req.cookies.lynx,
// 		}
// 	},
// }))

// app.listen(PORT, setTimeout(() => {
// 	console.log()
// 	console.log()
// 	console.log('           `\\.      ,/\'')
// 	console.log('            |\\\\____//|')
// 	console.log('            )/_ `\' _\\(')
// 	console.log('           ,\'/-`__\'-\\`\\     < StoryLynx >')
// 	console.log('           /. (_><_) ,\\')
// 	console.log('           ` )/`--\'\\(`\'')
// 	console.log('             `      \'')
// 	console.log()
// 	console.log(green('     listening on port ') + PORT + green(' in ') + NODE_ENV + green(' mode'))
// 	console.log()
// 	// console.log(JSON.stringify(process.env, null, 2))
// 	console.log()
// }, 100))
