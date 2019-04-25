import { magenta } from 'ansi-colors'
import { cmsMutate } from '../src/_server/utils/loaders'
import { random, unique } from '../src/_server/utils/basic-utils'
import { tags, externalMedia/* , mimeTypeEnums */ } from '../src/_client/js/json-helpers'

externalMedia.forEach(async(item, index) => {
	await runMutation(item, index)
})

async function runMutation(item, index) {
	console.log(magenta('------ >>>'), index)

	const thumb = item.thumbId ? `thumb: { connect: { id: "${item.thumbId}" } }` : ''
	const mutation = `
		mutation create($connect: [TagWhereUniqueInput!]) {
			createExternalAsset(data: {
				status: PUBLISHED,
				urls: { set: ${JSON.stringify(item.urls)} },
				summary: "${item.summary}",
				externalThumbUrl: "${item.externalThumbUrl}",
				${thumb}
				tags: { connect: $connect }
			}) {
				id
				createdAt
				urls
				summary
				thumb { url attribution handle }
				externalThumbUrl
				tags { tag }
			}
		}
	`

	const randomTags = unique([...Array(random(1, 4)).keys()]
		.map(() => tags[random(0, tags.length - 1)]))
		.map(tag => { return { tag } })
	randomTags.push({ tag: 'delete' })

	const variables = { connect: randomTags }

	// console.log(mutation)
	// console.log(variables)
	const { createExternalAsset: newExternalAsset } = await cmsMutate(mutation, variables)
	console.log(newExternalAsset)
}
