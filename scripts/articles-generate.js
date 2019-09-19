import { magenta, red } from 'ansi-colors'
import articles from '../static/json/sample-news-items.json'
import { cmsMutate } from '@johnny/utils/loaders'

async function runMutation(article, index) {

	console.log(magenta('------ >>>'), index)

	try {
		const assets = article.assetIds ? `assets: { connect: { id: "${article.assetIds}" } }` : ''
		const mutation = `
			mutation create(
				$status: Status,
				$connect: [ArticleTagWhereUniqueInput!]
			) {
				createArticle(data: {
					status: $status
					title: "${article.title}"
					publishedDatetime: "${article.publishedDatetime}"
					slug: "${article.slug}"
					content: "${article.content.join('\n')}"
					summary: "${article.summary}"
					${assets}
					tags: { connect: $connect }
				}) {
					id
					createdAt
					title
					slug
					html
					summary
					assets { id url handle summary fileName }
					tags { tag }
				}
			}
		`
		const variables = {
			status: article.status,
			connect: article.tags,
		}

		// console.log(mutation)
		// console.log(variables)
		// console.log(article.title)

		const { createArticle: newArticle } = await cmsMutate(mutation, variables)
		console.log(newArticle)
	} catch (error) {
		console.log(red('Error:'))
		console.error(error)
	}

}

articles.forEach(async(article, index) => runMutation(article, index))
// runMutation(articles[0], 0)
