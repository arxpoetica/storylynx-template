import { loremIpsum } from 'lorem-ipsum'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)
import { hyphenate, random, unique } from '../../_server/utils/basic-utils.js'

import { youtubes, videos, tags } from '../js/json-helpers.js'

export default () => {

	const arr = [...Array(30).keys()]

	return arr.map(($$$, index) => {

		const timestamp = dayjs()
			.set('date', random(0, 27))
			.set('month', random(0, 11))
			.set('year', random(2013, 2018))
			.set('hour', random(1, 24))
			.set('minute', random(0, 59))
			.set('second', random(0, 59))
		const randomTags = unique([...Array(random(1, 4)).keys()].map(() => tags[random(0, tags.length - 1)]))
		const tag = randomTags[random(0, randomTags.length - 1)]

		const item = {
			title: `${loremIpsum()} (${index + 1})`,
			summary: loremIpsum({ count: random(5, 40), units: 'words' }),
			timestamp: parseInt(timestamp.format('x')),
			timestampFormatted: timestamp.format('MMM D, YYYY'),
			tags: randomTags,
		}

		// types: video, audio, text, image
		const chance = random(1, 8)
		item.type = chance === 6 ? 'video' : (chance === 7 ? 'audio' : (chance === 8 ? 'text' : 'image'))
		item.id = `${item.type}-${index + 1}`
		if (item.type === 'video') {
			item.src = `http://lorempixel.com/${random(4, 30) * 20}/${random(4, 30) * 20}/${hyphenate(tag)}`
		// } else if (item.type === 'text') {
		} else if (item.type === 'image') {
			item.src = `http://lorempixel.com/${random(4, 30) * 20}/${random(4, 30) * 20}/${hyphenate(tag)}`
		}

		return item

	})

}
