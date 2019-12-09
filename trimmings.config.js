export default {
	postcss: { input: `src/client/${process.env.LYNX_TEMPLATE}/postcss` },
	svgo: {
		input: `src/client/${process.env.LYNX_TEMPLATE}/svgo`,
		outputSvelte: 'src/node_modules/@lynx/svg',
		outputStatic: false,
	},
}
