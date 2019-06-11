import { loremIpsum } from 'lorem-ipsum'
import { hyphenate, random, unique, randomTimestamp } from '@arxpoetica/utils'
import { assetIds, tags } from '../js/json-helpers.js'

export const compile = () => {

	const arr = [...Array(50).keys()]

	const result = arr.map((_, index) => {
		const title = `${loremIpsum()} (${index + 1})`
		const summary = loremIpsum({ count: random(5, 30), units: 'words' })
		const content = [...Array(random(2, 20)).keys()].map(el => {
			const rand = random(0, 8)
			const type = rand === 0 ? 'h2' : 'p'
			const words = loremIpsum({ count: random(5, 40), units: 'words' })
			return `<${type}>${words}</${type}>`
		})
		const randomTags = unique([...Array(random(1, 4)).keys()]
			.map(() => tags[random(0, tags.length - 1)]))
			.map(tag => { return { tag } })
		randomTags.push({ tag: 'delete' })
		const coverId = random(1, 4) === 1 ? false : assetIds[random(1, assetIds.length) - 1]

		return {
			status: random(0, 15) === 0 ? 'DRAFT' : 'PUBLISHED',
			title,
			publishedDatetime: randomTimestamp(),
			slug: random(0, 3) === 0 ? hyphenate(title).toLowerCase() : `news-item-${index + 1}`,
			summary,
			content,
			coverId,
			tags: randomTags,
		}
	})

	console.log(JSON.stringify(result))
}