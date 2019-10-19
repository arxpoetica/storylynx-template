import { config } from '../../config'
config.getAll()

import items from './data/archive-items.json'
items.forEach(async(source, index) => {
	// if (index < 1) {
	// 	await runMutation(source, index)
	// }
	await runMutation(source, index)
})

import { magenta } from 'ansi-colors'
import { cmsMutate } from '@johnny/utils/loaders'

async function runMutation(source, index) {

	console.log(magenta('MUTATION RUN ------ >>>'), index)

	const mutation = `
		mutation create($assets: [AssetWhereUniqueInput!]) {
			createResource( data: {
				status: PUBLISHED
				title: "${source.title}"
				slug: "${source.slug}"
				publishedDatetime: "${(new Date()).toISOString()}"
				html: "${source.html}"
				summary: "${source.summary}"
				assets: { connect: $assets }
			} ) {
				id
				status
				publishedDatetime
				title
				slug
				html
				summary
				assets { id url summary handle fileName }
			}
		}
	`
	const variables = {
		assets: [{ id: source.assetId }]
	}
	// console.log(mutation)
	// console.log(variables)
	// console.log(JSON.stringify(variables))

	try {
		const { createResource: newResource } = await cmsMutate(mutation, variables)
		console.log(newResource)
	} catch (error) {
		console.log(error)
	}

}


