import path from 'path'
import { EOL } from 'os'
import { yellow, red } from 'ansi-colors'
import { readFile, writeFile } from 'fs-extra'
import totalist from 'totalist'
import CheapWatch from 'cheap-watch'

let overrides_path
const storylynx_svelte_path = path.join(process.cwd(), '/node_modules/storylynx/svelte')
const ext_regex = /\.(html|js|postcss)$/
const postcss_regex = /<style([\S\s]*?)>([\S\s]*?)<\/style>/ig
const js_regex = /<script>([\S\s]*?)<\/script>/ig
const files = {}
let init = false

export default function overrides({ template }) {
	return {
		name: 'svelte-overrides',
		async buildStart() {
			if (!init) {
				overrides_path = path.join(process.cwd(), `/src/node_modules/@themes/${template}/overrides`)

				await totalist(overrides_path, async(name, abs) => {
					if (ext_regex.test(abs)) {
						await add_file(name)
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
						console.log('\n~>', yellow(isNew ? 'Adding' : 'Changing'), './' + filepath, '\n')
						if (isNew) {
							await add_file(filepath)
						}
						await mutate_and_bump_file(filepath)
					}
				})
				watch.on('-', async({ path: filepath, stats }) => {
					if (stats.isFile()) {
						console.log('\n~>', red('Deleting'), './' + filepath, '\n')
						const filename = filepath.replace(ext_regex, '')
						const ext = filepath.match(ext_regex)[0]
						delete files[filename][ext]
						if (Object.keys(files[filename]).length === 0) {
							delete files[filename]
						}
						await mutate_and_bump_file(filepath)
					}
				})
			}
		},
		async transform(code, id) {
			if (/\/storylynx\/svelte\//.test(id) && /\.svelte$/.test(id)) {
				const match = id.split('/storylynx/svelte/')[1].replace(/\.svelte$/, '')
				const fileset = files[match]
				if (fileset) {
					for (let type in fileset) {
						const ref = fileset[type]
						const content = await readFile(`${overrides_path}/${ref}`, 'utf8')

						if (type === '.postcss') {
							code = code.replace(postcss_regex, `<style type="text/scss">${content}</style>`)
						} else if (type === '.js') {
							code = code.replace(js_regex, `<script>${content}</script>`)
						} else if (type === '.html') {
							const postcss = code.match(postcss_regex)
							const js = code.match(js_regex)
							code = content
							code += js.length ? js[0] : ''
							code += postcss.length ? postcss[0] : ''
						}
					}
					return { code, map: null }
				}
			}
			return null
		},
		buildEnd() {
			if (!init) {
				init = true
			}
		},
	}
}

async function add_file(filepath) {
	// TODO: explicitly check that this file set can be added because it exists in the engine???
	const filename = filepath.replace(ext_regex, '')
	const ext = filepath.match(ext_regex)[0]
	files[filename] = files[filename] || {}
	files[filename][ext] = filepath
}

// ...yes, we're mutating the file, but in a premeditated, controlled fashion...
async function mutate_and_bump_file(filepath) {
	filepath = path.join(storylynx_svelte_path, filepath.replace(ext_regex, '.svelte'))
	const contents = await readFile(filepath, 'utf8')
	if (contents.endsWith(' ')) {
		await writeFile(filepath, contents.trim(), 'utf8')
	} else {
		await writeFile(filepath, contents + EOL + ' ', 'utf8')
	}
}
