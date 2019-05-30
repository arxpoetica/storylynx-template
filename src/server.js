// FIXME: config should work
// import config from './server/build/config'
import { green, yellow, red } from 'ansi-colors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import sirv from 'sirv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import { authSetup } from './server/services/auth-setup.js'
// import { validate } from './routes/_services/auth-check.js'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const development = NODE_ENV === 'development'

// https://www.joyent.com/node-js/production/design/errors
// TODO: https://shapeshed.com/uncaught-exceptions-in-node/
// handle all uncaught exceptions
// see - https://nodejs.org/api/process.html#process_event_uncaughtexception
process.on('uncaughtException', error => console.error(red('Uncaught Exception:'), error))
// handle all unhandled promise rejections
// see - http://bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
// or for latest node - https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', error => console.error(red('Unhandled Rejection:'), error))

// ---> FOOTGUN!?
async function start() {

	// NOTE: order matters!!! https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459
	const app = express()

	app.use(morgan(development ? 'dev' : 'combined', {
		skip: (req, res) => development ? false : res.statusCode < 400,
	}))

	// SEE: https://expressjs.com/en/advanced/best-practice-security.html
	app.use(helmet())
	app.set('trust proxy', 1) // trust first proxy

	app.use(compression({ threshold: 0 }))
	app.use(sirv('static', { development }))

	// app.use(bodyParser.text())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(cookieParser())

	// await authSetup(app)

	app.use(sapper.middleware({
		session: req => {
			// FIXME???
			// const user = validate(req)
			const user = { unauthorized: true }
			return {
				env: NODE_ENV,
				user: user.unauthorized ? null : user,
				// req: req,
			}
		},
	}))

	app.listen(PORT, setTimeout(() => {
		console.log()
		console.log()
		console.log('       \'\\                   .  .                        |>' + red('18') + '>>')
		console.log('         \\              .         \' .                   |')
		console.log(yellow('        O>>') + '         .                 \'o                |')
		console.log(yellow('         \\') + '       .                                      |')
		console.log(yellow('         /\\') + '    .                                        |')
		console.log(yellow('        / /') + '  .\'                                         |')
		console.log(green('     ^^^^^^^`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'))
		console.log('     ~~~~~~~~   Johnny Miller   ~~~~~~~~   his personal website.')
		console.log(green('     listening on port ') + PORT + green(' in ') + NODE_ENV + green(' mode'))
		console.log()
		// console.log(JSON.stringify(process.env, null, 2))
		console.log()
	}, 100))

}

start()
