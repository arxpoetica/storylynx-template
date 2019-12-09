export default {
	postcss: {
		input: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/src/postcss`,
		outputStatic: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/static/css`,
	},
	svgo: {
		input: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/src/svgo`,
		outputSvelte: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/svelte/svg`,
		outputStatic: false,
	},
}
