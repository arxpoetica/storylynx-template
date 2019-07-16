import { magenta, red } from 'ansi-colors'
import articles from './articles-fix-data'
import { cmsMutate } from '../src/node_modules/@johnny/utils/loaders'

async function runMutation(article, index) {

	console.log(magenta('------ >>>'), index)

	try {
		const mutation = `
			mutation {
				updateArticle(
					where: {
						id: "${article.id}"
					}
					data: {
						html: "${article.content.html}"
					}
				) {
					id
					html
				}
			}
		`
		// console.log(mutation)
		// console.log(article.id)

		const { updateArticle } = await cmsMutate(mutation)
		console.log(updateArticle)
	} catch (error) {
		console.log(red('Error:'))
		console.error(error)
	}

}

articles.forEach(async(article, index) => runMutation(article, index))
// runMutation(articles[0], 0)
