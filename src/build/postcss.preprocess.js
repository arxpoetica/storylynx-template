import { promises } from 'fs'
const { readFile, writeFile } = promises
import postcss from 'postcss'
import syntax from 'postcss-scss'
import ansicolors from 'ansi-colors'
const { red, cyan } = ansicolors
import { config } from '../../trimmings.config.js'
import { plugins } from './postcss.plugins.js'
// import { refresh } from '../trimmings/tools'

export const preprocess = {
	style: async({ content, attributes, filename, markup }) => {
		try {
			let code = content

			if (attributes.lang?.includes('scss') || attributes.type?.includes('scss')) {

				const preImport = `@import 'src/lib/@themes/${process.env.LYNX_TEMPLATE}/postcss/svelte-pre-imports';\n`
				const result = await postcss(plugins).process(preImport + content, {
					from: 'src',
					syntax,
				})

				if (result.css && typeof result.css === 'string') {
					code = result.css.toString()
				}
			}

			return { code }

		} catch (error) {
			console.log(red('Error with PostCSS compile.'))
			console.log(error)
			console.log()
			// process.exit(0)
			// return { code: '' }
		}
	},
}

export const global_preprocess = async() => {
	try {
		const from = `${config.postcss.input}/${config.postcss.filename}.postcss`
		const to = `${config.postcss.outputStatic}/${config.postcss.filename}.css`
		const content = await readFile(from)

		const result = await postcss(plugins).process(content, {
			from,
			to,
			syntax,
			map: { inline: false },
		})
		// console.log(result.css)
		// console.log(result.map)
		await writeFile(to, result.css.toString())
		if (result.map) {
			await writeFile(`${to}.map`, result.map.toString())
		}
		// await refresh()
		console.log('~>', cyan('Finished converting global.postcss to global.css'))
		console.log()
	} catch (error) {
		console.error(`error: ${error}`)
	}
}
