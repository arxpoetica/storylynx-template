import { config as lynxConfig } from './config.js'
const rollupVars = lynxConfig.getAll()

import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import inject_templates from 'storylynx/utils/rollup-plugin-inject-templates'
import svelte_overrides from 'storylynx/utils/rollup-plugin-svelte-overrides'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import { set_env_path, preprocess } from '@sapper-dragon/postcss/tools'
set_env_path('.env')

const dev = process.env.NODE_ENV === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message))
	|| (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message))
	|| onwarn(warning)

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			svelte_overrides({ template: process.env.LYNX_TEMPLATE }),
			inject_templates({ template: process.env.LYNX_TEMPLATE, domain: 'client' }),
			replace({
				'process.browser': true,
				'process.server': false,
				...rollupVars,
			}),
			svelte({
				dev,
				extensions: ['.html', '.svelte', '.svg'],
				hydratable: true,
				emitCss: true,
				preprocess: preprocess('client'),
			}),
			json(),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte', '.svg'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead',
					}],
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true,
					}],
				],
			}),
			!dev && terser({ module: true }),
		],
		watch: { chokidar: true },
		preserveSymlinks: true,
		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			inject_templates({ template: process.env.LYNX_TEMPLATE, domain: 'server' }),
			replace({
				'process.browser': false,
				'process.server': true,
				...rollupVars,
			}),
			svelte({
				dev,
				extensions: ['.html', '.svelte', '.svg'],
				hydratable: true,
				generate: 'ssr',
				preprocess: preprocess('server'),
			}),
			json(),
			resolve({ dedupe: ['svelte'] }),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),
		watch: { chokidar: true },
		preserveSymlinks: true,
		preserveEntrySignatures: false,
		onwarn,
	},

}
