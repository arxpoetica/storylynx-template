export default {
	json: { input: 'src/client/json' },
	postcss: { input: 'src/client/postcss' },
	svgo: {
		input: 'src/client/svgo',
		outputSvelte: 'src/node_modules/@johnny/svg',
		outputStatic: false,
	},
}
