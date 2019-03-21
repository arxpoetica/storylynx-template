import { loremIpsum } from 'lorem-ipsum'
import { format, subHours } from 'date-fns'
import { hyphenate, random } from '../../_server/utils/basic-utils.js'

const youtubes = [
	'https://www.youtube.com/watch?v=KpMZXrRo99g',
	'https://www.youtube.com/watch?v=lZHUmQ-dCXM',
	'https://www.youtube.com/watch?v=JyGGLB542ks',
	'https://www.youtube.com/watch?v=us79YXHPqZQ',
	'https://www.youtube.com/watch?v=6uqvgPm8U4c',
	'https://www.youtube.com/watch?v=-oD7B7oiBtw',
	'https://www.youtube.com/watch?v=YVYzxm_RqMg',
	'https://www.youtube.com/watch?v=YsBVu6f8pR8',
	'https://www.youtube.com/watch?v=YsBVu6f8pR8',
]

// https://loremflickr.com/320/240?lock=1
const tags = [
	'abstract',
	'animals',
	'business',
	'cats',
	'city',
	'food',
	'nightlife',
	'fashion',
	'people',
	'nature',
	'sports',
	'technics',
	'transport',
	'technics',
]

module.exports = () => {

	return [...Array(83).keys()].map(($$$, index) => {

		const timestamp = subHours(new Date(), random(24, 24 * 90))

		const item = {
			title: `${loremIpsum()} (${index + 1})`,
			summary: loremIpsum({ count: random(5, 40), units: 'words' }),
			timestamp: parseInt(format(timestamp, 'x')),
			timestampFormatted: format(timestamp, 'MMM D, YYYY'),
			type: random(100, 600),
			src: `http://lorempixel.com/${random(4, 30) * 20}/${random(4, 30) * 20}/${hyphenate(tags[random(0, tags.length - 1)])}`,
			url: `/path/to/article-${index + 1}.html`,
			image: `img/_examples/news-list-${(index % 4) + 1}.png`,
			imageAlt: loremIpsum({ count: 6, units: 'words' }),
			// tags: _.uniq(_.map(new Array(random(0, 3) === 0 ? random(1, 6) : 1), (item, index) => {
			// 	return tags[random(tags.length - 1)]
			// })),
		}

		return item

	})

}
