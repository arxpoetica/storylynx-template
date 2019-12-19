export default {
	postcss: {
		input: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/postcss`,
		outputStatic: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/static/css`,
	},
	svgo: {
		input: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/svgo`,
		outputSvelte: `src/node_modules/@themes/${process.env.LYNX_TEMPLATE}/svelte/svg`,
		outputStatic: false,
	},
}
