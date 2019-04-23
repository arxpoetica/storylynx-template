import { unique, random } from '../src/_server/utils/basic-utils'
import { magenta } from 'ansi-colors'
import { cmsMutate } from '../src/_server/utils/loaders'
import { assetIds, tags, articleIds } from '../src/_client/js/json-helpers'

articleIds.forEach(async(id, index) => {
	const rando = random(1, 4)
	if (rando === 1) {
		updateArticle(id)
	} else {
		updateArticle(id, true)
	}
})

async function updateArticle(id, cover) {

	console.log(magenta('------ >>>'), id)

	cover = cover ? `cover: { connect: { id: "${assetIds[random(1, assetIds.length) - 1]}" } }` : ''
	const mutation = `
		mutation update($connect: [TagWhereUniqueInput!]) {
			updateArticle(
				where: { id: "${id}" }
				data: {
					${cover}
					tags: { connect: $connect }
				}
			) {
				title
				cover {
					id
					url
					handle
					attribution
				}
				tags(where: { status: PUBLISHED }) {
					tag
				}
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
	// console.log(article.title)
	const { updateArticle: updatedArticle } = await cmsMutate(mutation, variables)
	console.log(updatedArticle)

}
