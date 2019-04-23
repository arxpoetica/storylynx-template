import { magenta } from 'ansi-colors'
import Html from 'slate-html-serializer'
import { JSDOM } from 'jsdom'
const serializer = new Html({ parseHtml: JSDOM.fragment })
import articles from '../static/json/sample-news-items.json'
const articlesLength = articles.length
import { cmsMutate } from '../src/_server/utils/loaders'

async function runMutation(index) {
	console.log(magenta('------ >>>'), index)
	const article = articles[index]
	const mutation = `
		mutation create($status: Status, $content: RichTextAST, $connect: [TagWhereUniqueInput!]) {
			createArticle(data: {
				status: $status
				title: "${article.title}"
				slug: "${article.slug}"
				content: $content
				summary: "${article.summary}"
				cover: { connect: { id: "${article.coverId}" } }
				tags: { connect: $connect }
			}) {
				id
				createdAt
				title
				slug
				content { html }
				summary
				cover { url attribution }
				tags { tag }
			}
		}
	`
	const variables = {
		status: article.status,
		content: serializer.deserialize(article.content.join('\n')),
		connect: article.tags,
	}

	// console.log(mutation)
	// console.log(variables)
	// console.log(article.title)
	const { createArticle: newArticle } = await cmsMutate(mutation, variables)
	console.log(newArticle)

	index++
	if (index < articlesLength) {
		setTimeout(async() => {
			await runMutation(index)
		}, 1000 * 60 * 3)
	}
}
runMutation(0)
