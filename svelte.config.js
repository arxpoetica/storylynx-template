import { preprocess } from './src/build/postcss.preprocess.js'
// import adapter from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		target: '#svelte',
		// adapter: adapter(),
		files: {
			assets: `src/lib/@themes/${process.env.LYNX_TEMPLATE}/static`,
		},
		vite: {
			clearScreen: false,
		},
	},
	preprocess,
}
