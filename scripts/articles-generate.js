import { magenta } from 'ansi-colors'
// import Html from 'slate-html-serializer'
// import { JSDOM } from 'jsdom'
// const serializer = new Html({ parseHtml: JSDOM.fragment })
import articles from '../static/json/sample-news-items.json'
// import { cmsMutate } from '../src/server/utils/loaders'

async function runMutation(index) {

	if (index > 0) { return }

	console.log(magenta('------ >>>'), index)

	const article = articles[index]
	const cover = article.coverId ? `cover: { connect: { id: "${article.coverId}" } }` : ''
	const mutation = `
		mutation create(
			$status: Status,
			$content: RichTextAST,
			$connect: [TagWhereUniqueInput!]
		) {
			createArticle(data: {
				status: $status
				title: "${article.title}"
				slug: "${article.slug}"
				content: $content
				summary: "${article.summary}"
				${cover}
				tags: { connect: $connect }
			}) {
				id
				createdAt
				title
				slug
				content { html }
				summary
				cover { id url handle attribution }
				tags { tag }
			}
		}
	`
	const variables = {
		status: article.status,
		// content: serializer.deserialize(article.content.join('\n')),
		connect: article.tags,
	}

	console.log(mutation)
	console.log(variables)
	// console.log(article.title)

	// const { createArticle: newArticle } = await cmsMutate(mutation, variables)
	// console.log(newArticle)

}

articles.forEach(async(article, index) => runMutation(index))
