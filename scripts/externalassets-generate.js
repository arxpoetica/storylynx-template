import { magenta } from 'ansi-colors'
import { loremIpsum } from 'lorem-ipsum'
import { cmsMutate } from '../src/_server/utils/loaders'
import { random, unique } from '../src/_server/utils/basic-utils'
import { tags/* , mimeTypeEnums */ } from '../src/_client/js/json-helpers'

const arr = [...Array(49).keys()]
arr.forEach(async(item, index) => {
	await runMutation(index)
})

async function runMutation(index) {
	console.log(magenta('------ >>>'), index)

	const url = `https://picsum.photos/id/${random(0, 1082)}/600/600`
	const summary = loremIpsum({ count: random(4, 18), units: 'words' })
	const randomTags = unique([...Array(random(1, 4)).keys()]
		.map(() => tags[random(0, tags.length - 1)]))
		.map(tag => { return { tag } })
	randomTags.push({ tag: 'delete' })

	const mutation = `
		mutation create($status: Status, $mediaType: MediaType!, $connect: [TagWhereUniqueInput!]) {
			createExternalAsset(data: {
				status: $status
				url: "${url}"
				summary: "${summary}"
				mediaType: $mediaType
				tags: { connect: $connect }
			}) {
				id
				createdAt
				url
				summary
				mediaType
				tags { tag }
			}
		}
	`
	const variables = {
		status: random(1, 10) === 1 ? 'DRAFT' : 'PUBLISHED',
		// mediaType: mimeTypeEnums[random(0, mimeTypeEnums.length - 1)],
		mediaType: 'Unknown',
		connect: randomTags,
	}

	// console.log(mutation)
	// console.log(variables)
	const { createExternalAsset: newExternalAsset } = await cmsMutate(mutation, variables)
	console.log(newExternalAsset)

}
