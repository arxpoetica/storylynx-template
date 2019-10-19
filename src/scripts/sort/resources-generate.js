import { magenta } from 'ansi-colors'
import { loremIpsum } from 'lorem-ipsum'
import { resources } from './resources-sample-data'
import { assetIds } from '../../client/js/json-helpers'
import { random } from '@johnny/utils/basic-utils'
import { cmsMutate } from '@johnny/utils/loaders'

resources.forEach(async(source, index) => {
	// if (index < 1) {
	// 	await runMutation(source, index)
	// }
	await runMutation(source, index)
})

async function runMutation(source, index) {

	console.log(magenta('------ >>>'), index)

	const includeAssets = source.urls.length ? '' : '$assets: [AssetWhereUniqueInput!]'
	const internalResources = source.urls.length ? '' : 'internalResources: { connect: $assets },'
	const externalResources = source.urls.length ? `externalResources: { set: ${JSON.stringify(source.urls)} },` : ''
	const internalThumb = source.thumb ? `internalThumb: { connect: { id: "${source.thumb.id}" } },` : ''
	const externalThumb = source.externalThumbUrl ? `externalThumb: "${source.externalThumbUrl}",` : ''
	const description = [...Array(random(2, 20)).keys()].map(el => {
		const rand = random(0, 8)
		const type = rand === 0 ? 'h2' : 'p'
		const words = loremIpsum({ count: random(5, 40), units: 'words' })
		return `<${type}>${words}</${type}>`
	}).join('')

	const mutation = `
		mutation create(
			${includeAssets}
			$tags: [TagWhereUniqueInput!]
		) {
			createResource(data: {
				status: ${source.status},
				${internalResources}
				${externalResources}
				${internalThumb}
				${externalThumb}
				summary: "${source.summary}",
				description: "${description}",
				tags: { connect: $tags }
			}) {
				id
				createdAt
				internalResources { id url handle }
				externalResources
				internalThumb { id url handle }
				externalThumb
				summary
				description
				tags { tag }
			}
		}
	`

	const variables = {
		tags: source.tags,
	}
	if (includeAssets) {
		variables.assets = [{ id: assetIds[random(0, assetIds.length - 1)] }]
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
