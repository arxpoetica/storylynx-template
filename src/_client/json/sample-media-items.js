import { loremIpsum } from 'lorem-ipsum'
import { format, subHours } from 'date-fns'
import { hyphenate, random, unique } from '../../_server/utils/basic-utils.js'

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

const videos = [
	'https://ak7.picdn.net/shutterstock/videos/1015813417/preview/stock-footage-leaves-shadow-on-the-wall-chiangmai-thailand.webm',
	'https://ak7.picdn.net/shutterstock/videos/1015637317/preview/stock-footage-leave-shadows-on-the-wall-chiangmai-thailand.webm',
	'https://ak1.picdn.net/shutterstock/videos/1009123061/preview/stock-footage-leaves-shadow-on-the-wall.mp4',
	'https://ak7.picdn.net/shutterstock/videos/3538277/preview/stock-footage-water-whirlpool-close-up-in-slow-motion.webm',
	'https://ak6.picdn.net/shutterstock/videos/1016655106/preview/stock-footage-winter-in-siberia-drone-flight-over-the-frozen-mountain-forest.webm',
	'https://ak8.picdn.net/shutterstock/videos/27008998/preview/stock-footage-top-view-of-the-giant-waves-foaming-and-splashing-in-the-ocean-sunny-day-slow-motion-video.webm',
	'https://ak6.picdn.net/shutterstock/videos/24364166/preview/stock-footage-cg-animation-of-white-powder-explosion-on-black-background-slow-motion-movement-with-acceleration.webm',
	'https://ak3.picdn.net/shutterstock/videos/23786773/preview/stock-footage-cg-animation-of-powder-explosion-with-blue-red-orange-and-violet-colors-on-white-background-slow.webm',
	'https://ak4.picdn.net/shutterstock/videos/18809354/preview/stock-footage-silhouette-of-unrecognizable-people-commuting-in-the-city-crowded-metropolis-street-scenery.webm',
]

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

	const arr = [...Array(83).keys()]

	return arr.map(($$$, index) => {

		const timestamp = subHours(new Date(), random(24, 24 * 90))
		const randomTags = unique([...Array(random(1, 4)).keys()].map(() => tags[random(0, tags.length - 1)]))
		const tag = randomTags[random(0, randomTags.length - 1)]

		const item = {
			title: `${loremIpsum()} (${index + 1})`,
			summary: loremIpsum({ count: random(5, 40), units: 'words' }),
			timestamp: parseInt(format(timestamp, 'x')),
			timestampFormatted: format(timestamp, 'MMM D, YYYY'),
			tags: randomTags,
		}


		// types: video, audio, text, image
		const chance = random(1, 8)
		item.type = chance === 6 ? 'video' : (chance === 7 ? 'audio' : (chance === 8 ? 'text' : 'image'))
		item.url = `/archive/${item.type}-${index + 1}.html`
		if (item.type === 'video') {
			item.src = `http://lorempixel.com/${random(4, 30) * 20}/${random(4, 30) * 20}/${hyphenate(tag)}`
		// } else if (item.type === 'audio') {
		// 	item.src = `http://lorempixel.com/${random(4, 30) * 20}/${random(4, 30) * 20}/${hyphenate(tag)}`
		// } else if (item.type === 'text') {
		} else if (item.type === 'image') {
			item.src = `http://lorempixel.com/${random(4, 30) * 20}/${random(4, 30) * 20}/${hyphenate(tag)}`
		}

		return item

	})

}
