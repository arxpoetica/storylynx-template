import { getToken } from '@johnny/services/auth-helpers'
import { handleError, cmsQuery } from '@johnny/utils/loaders'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { article, tags } = await cmsQuery(`{
			article(where: { id: "${req.body.id}" }) {
				id
				status
				publishedDatetime
				title
				slug
				html
				summary
				cover { url summary handle }
				tags { id tag }
			}
			tags { id tag }
		}`)

		// const article = {
		// 	id: 'cjwe7ehgjyqvu094673hv9qnc',
		// 	status: 'PUBLISHED',
		// 	publishedDatetime: '2018-08-04T05:42:52.766Z',
		// 	title: 'Irure consequat pariatur dolor qui esse sunt Lorem ad. (4)',
		// 	slug: 'news-item-4',
		// 	html: '<p>incididunt dolore laboris qui ad culpa animaliquip magna ut minim ipsum Lorem laborum ipsum anim aliqua consequat ullamco anim ut nostrud adipisicing cupidatat ut mollit laboris aute Lorem Lorem cupidatat eiusmod sit sint dolore qui sintconsectetur id labore tempor ad dolore quisest ad nulla aliquip aute duis deserunt adipisicing aute irure anim laboris exercitation minim irure quis occaecat deserunt adipisicing elitculpa sit exercitation sint nostrud adlaborum elit anim ea eiusmod consequat sint aliqua et exercitation id consequatvelit in duis mollit est adipisicing exercitation sint et nostrud sit eu cillum excepteur ex magna exercitation commodo utaliqua ex fugiat aliqua officia proident duis ad proident fugiat officia non nulla cupidatat id consequat ut qui ipsum nulla nisi nisi aliquip occaecat eu sint adipisicing ex anim ea tempor duis irure adipisicing deserunt ut</p>',
		// 	summary: 'Lorem ipsum et ad duis fugiat veniam pariatur duis est incididunt veniam officia consequat nostrud officia cupidatat fugiat laboris Lorem qui enim aliqua ut',
		// 	cover: {
		// 		url: 'https://media.graphcms.com/KPZUYkD8RuC9GwlioGzU',
		// 		summary: null,
		// 		handle: 'KPZUYkD8RuC9GwlioGzU',
		// 	},
		// 	tags: [{
		// 		id: 'tournament',
		// 		tag: 'tournament',
		// 	}, {
		// 		id: 'broadcast',
		// 		tag: 'broadcast',
		// 	}, {
		// 		id: 'delete',
		// 		tag: 'delete',
		// 	}, {
		// 		id: '1970s',
		// 		tag: '1970s',
		// 	}],
		// }
		// const tags = [{
		// 	id: 'family',
		// 	tag: 'family',
		// }, {
		// 	id: 'tournament',
		// 	tag: 'tournament',
		// }, {
		// 	id: 'broadcast',
		// 	tag: 'broadcast',
		// }, {
		// 	id: 'delete',
		// 	tag: 'delete',
		// }, {
		// 	id: '1950s',
		// 	tag: '1950s',
		// }, {
		// 	id: '1960s',
		// 	tag: '1960s',
		// }, {
		// 	id: '1970s',
		// 	tag: '1970s',
		// }, {
		// 	id: '1980s',
		// 	tag: '1980s',
		// }]

		return res.json({ article, tags })
	} catch (error) {
		return handleError(error, res)
	}

}
