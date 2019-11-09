import cheerio from 'cheerio'
import { CURL } from './helpers'


const go_and_do = async() => {
	const body = await CURL('https://news.search.yahoo.com/search?p=johnny+miller+golf&fr=uh3_news_vert_gs')
	const $ = cheerio.load(body)

	const articles = []
	const $els = $('.searchCenterMiddle > li')
	$els.each((index, el) => {
		const $el = $(el)
		const article = {
			id: index,
			headline: $el.find('h4').text(),
			source: $el.find('.cite-co').text().split(' via Yahoo Sports')[0],
			timestamp: $el.find('.mr-8').text().split('· ')[1],
			link: $el.find('h4 a').attr('href'),
			summary: $el.find('p').text(),
		}
		articles.push(article)
	})
	console.log(articles)
}
go_and_do()
