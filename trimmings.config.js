export default {
	json: {
		input: 'src/client/json',
		outputStatic: 'src/scripts/data',
	},
	postcss: { input: 'src/client/postcss' },
	svgo: {
		input: 'src/client/svgo',
		outputSvelte: 'src/node_modules/@johnny/svg',
		outputStatic: false,
	},
}
