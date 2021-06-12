import sveltePreprocess from './postcss.preprocess.js'
// import adapter from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		target: '#svelte',
		// adapter: adapter(),
		vite: {
			clearScreen: false,
		},
	},
	preprocess: sveltePreprocess,
}
