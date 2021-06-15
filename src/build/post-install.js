import { promises } from 'fs'
const { symlink, readlink } = promises
import pkg from 'ansi-colors'
const { white, green, yellow, red } = pkg

process
	.on('unhandledRejection', () => {}) // no op
	.on('uncaughtException', err => {}) // no op

let symlink_target = 'node_modules/storylynx-api-graphcms'
const symlink_path = 'node_modules/storylynx/node_modules/storylynx-api-graphcms'

try {
	const updated_target = await readlink('node_modules/storylynx-api-graphcms')
	symlink_target = updated_target
} catch (error) {} // no op

try {
	symlink(symlink_target, symlink_path, 'dir')
	console.log(green(`-----> symlink path ${white(symlink_path)} created for target ${white(symlink_target)}`))
	console.log()
} catch (error) {} // no op
