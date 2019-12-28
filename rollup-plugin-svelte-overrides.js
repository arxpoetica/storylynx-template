import path from 'path'
import { EOL } from 'os'
import { yellow, red } from 'ansi-colors'
import { appendFile, readFile } from 'fs-extra'
import totalist from 'totalist'
import CheapWatch from 'cheap-watch'

let overrides_path
const storylynx_svelte_path = path.join(process.cwd(), '/node_modules/storylynx/svelte')
const ext_regex = /\.(html|js|postcss)$/
const files = new Set()
let init = false

export default function overrides({ template }) {
	return {
		name: 'svelte-overrides',
		async buildStart() {
			if (!init) {
				overrides_path = path.join(process.cwd(), `/src/node_modules/@themes/${template}/overrides`)

				await totalist(overrides_path, (name, abs) => {
					if (/\.(html|js|postcss)$/.test(abs)) {
						files.add(name)
					}
				})

				const watch = new CheapWatch({
					dir: overrides_path,
					filter: ({ path, stats }) => ext_regex.test(path) || stats.isDirectory(),
					debounce: 100,
				})
				await watch.init()
				watch.on('+', async({ path: filepath, stats, isNew }) => {
					if (stats.isFile()) {
						console.log('~>', yellow(isNew ? 'Adding' : 'Changing'), './' + filepath)
						if (isNew) {

						}

						// ...yes, we're mutating the file, but carefully...
						const file = path.join(storylynx_svelte_path, filepath.replace(ext_regex, '.svelte'))
						await appendFile(file, EOL, 'utf8')
					}
				})
				watch.on('-', async({ path: filepath, stats }) => {
					if (stats.isFile()) {
						console.log('~>', red('Deleting'), './' + filepath)
					}
				})
			}
		},
		async transform(code, id) {
			if (init && /\/storylynx\/svelte\//.test(id) && /\.svelte$/.test(id)) {
				const match = id.split('/storylynx/svelte/')[1].replace(/\.svelte$/, '')
				const replacers = [...files].filter(file => file.indexOf(match) === 0)
				for (let replacer of replacers) {
					const postcss = await readFile(`${overrides_path}/${replacer}`, 'utf8')
					// TODO: mark the type, right now it's assuming it's `.postcss`
					code = code.replace(/<style([\S\s]*?)>([\S\s]*?)<\/style>/ig, `<style type="text/scss">${postcss}</style>`)
				}
				return { code }
			}
			return null
		},
		buildEnd() {
			if (!init) {
				init = true
				// console.log('------ BUILD START INITIALIZED ------')
			}
		},
	}
}
