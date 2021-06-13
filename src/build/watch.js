import path from 'path'
import CheapWatch from 'cheap-watch'
import pkg from 'ansi-colors'
const { green, yellow, red } = pkg
import { config } from '../../trimmings.config.js'

const watcher = async(name, change, remove) => {

	console.log('~>', green('Watching Sapper trimming:'), name)

	const watch = new CheapWatch({
		dir: path.join(process.cwd(), `/${config[name].input}`),
		filter: ({ path, stats }) => {
			const match =
				path.indexOf('.git') !== 0 &&
				path.indexOf('node_modules') !== 0 &&
				// path.indexOf('_') !== 0 &&
				(!!path.match(config[name].filter) || stats.isDirectory())
			return match
		},
		debounce: 100,
	})

	await watch.init()

	watch.on('+', ({ path, stats, isNew }) => {
		if (stats.isFile()) {
			console.log('~>', yellow(isNew ? 'Adding' : 'Changing'), './' + path)
			if (change) {
				change({ config, filepath: path, isNew })
			}
		}
	})
	watch.on('-', ({ path, stats }) => {
		if (stats.isFile()) {
			console.log('~>', red('Deleting'), './' + path)
			if (remove) {
				remove({ config, filepath: path })
			}
		}
	})
}

import { global_preprocess } from './postcss.preprocess.js'
watcher('postcss', global_preprocess, false)
