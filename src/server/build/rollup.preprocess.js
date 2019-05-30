import { red } from 'ansi-colors'
import postcss from 'postcss'
import postcssScssSyntax from 'postcss-scss'
// UNFORTUNATELY THIS IS AN ABSOLUTE PATH, WEIRDLY
const plugins = require('./src/server/build/postcss.config.vars').plugins

export default function(/* domain */) {
	// NOTE: `domain` is useful for debugging if it is SSR or DOM
	return {
		style: async({ content, attributes, filename }) => {
			if (attributes.type !== 'text/scss') {
				return { code: content/* , map: '' */ }
			}
			try {
				const result = await postcss(plugins).process('@import \'routes-includes\';\n' + content, {
					from: 'src',
					syntax: postcssScssSyntax,
					// TODO: unclear if maps are needed. ASK in the forum
					// map: true,
				})
				if (result.css && typeof result.css === 'string') {
					return {
						code: result.css.toString(),
						// map: result.map.toString(),
					}
				} else {
					return { code: ''/* , map: '' */ }
				}

			} catch (error) {
				console.log(red('Error: something went wrong'))
				console.log(error)
				return { code: ''/* , map: '' */ }
			}
		},
	}
}
