import { config as lynxConfig } from './config.js'
const rollupVars = lynxConfig.getAll()

import inject_templates from 'storylynx/utils/rollup-plugin-inject-templates'
import svelte_overrides from 'storylynx/utils/rollup-plugin-svelte-overrides'
import { set_env_path, preprocess } from '@sapper-dragon/postcss/tools'
set_env_path('.env')

export default {
	client: {
		plugins: [
			svelte_overrides({ template: process.env.LYNX_TEMPLATE }),
			inject_templates({ template: process.env.LYNX_TEMPLATE, domain: 'client' }),
		],
	},

}
