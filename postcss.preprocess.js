import postcss from 'postcss'
import syntax from 'postcss-scss'
import easy_import from 'postcss-easy-import'
import mixins from 'postcss-mixins'
import simple_vars from 'postcss-simple-vars'
import functions from 'postcss-functions'
import tinycolor from 'tinycolor2'
import hexrgba from 'postcss-hexrgba'
import custom_media from 'postcss-custom-media'
import media_minmax from 'postcss-media-minmax'
import nested from 'postcss-nested'
import global_nested from 'postcss-global-nested'
import math from 'postcss-math'
import strip from 'postcss-strip-inline-comments'
import reporter from 'postcss-reporter'
import ansicolors from 'ansi-colors'
const { red } = ansicolors

export default {
	style: async({ content, attributes, filename, markup }) => {
		try {
			let code = content

			if (attributes.lang?.includes('scss') || attributes.type?.includes('scss')) {
				// const preImport = `@import '';\n`
				// const result = await postcss(plugins).process(preImport + content, {
				const result = await postcss([
					easy_import({
						// FIXME: what is the correct input path?????
						path: [config.postcss.input, 'router'],
						extensions: ['.css', '.scss', '.postcss'],
						prefix: '_',
					}),
					mixins,
					simple_vars,
					functions({
						functions: {
							// url: path => {
							// 	return `url('../${path.replace(/["']/g, '')}')`
							// },
							urlstatic: path => {
								return `url(${path})`
							},
							em: (fontSize, parentFontSize) => {
								parentFontSize = parentFontSize || 10
								return (Math.round(fontSize / parentFontSize * 1000) / 1000) + 'em'
							},
							fw: (targetFontSize, targetViewportWidth) => {
								targetViewportWidth = targetViewportWidth || 1000
								return (Math.round(1000 / targetViewportWidth * targetFontSize / 10 * 1000) / 1000) + 'vw'
							},
							lh: (fontSize, lineHeight) => {
								return Math.round(lineHeight / fontSize * 100) / 100
							},
							ratio: (divider, divided) => {
								return Number((divider / divided * 100).toFixed(3)) + '%'
							},
							tinycolor: (color, method, ...theArgs) => {
								return tinycolor(color)[method](...theArgs)/* .toString() */
							},
							percent: (maths, placeValue) => {
								placeValue = placeValue || 100
								return `resolve(round(${maths} * 100 * ${placeValue}) / ${placeValue})%`
							},
						},
					}),
					hexrgba,
					custom_media,
					media_minmax,
					nested,
					global_nested,
					math,
					strip,
					reporter,
				]).process(content, { from: 'src', syntax })

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
