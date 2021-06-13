export const config = {
	json: {
		input: 'src/trimmings/json',
		filter: /\.js$/,
		outputStatic: 'static/json',
	},
	postcss: {
		input: `src/lib/@themes/${process.env.LYNX_TEMPLATE}/postcss`,
		filename: 'global',
		filter: /\.(postcss|css|scss)$/,
		outputStatic: `src/lib/@themes/${process.env.LYNX_TEMPLATE}/static/css`,
	},
	svgo: {
		input: `src/lib/@themes/${process.env.LYNX_TEMPLATE}/svgo`,
		filter: /\.(svg)$/,
		outputSvelte: `src/lib/@themes/${process.env.LYNX_TEMPLATE}/svelte/svg`,
		outputStatic: false,
	},
}
