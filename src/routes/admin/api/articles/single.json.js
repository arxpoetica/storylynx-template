import { cmsQuery } from '@johnny/utils/loaders'
import { getToken } from '@johnny/services/auth-helpers'

export async function post(req, res) {

	try {
		const token = getToken(req.cookies.jm || req.body.cookie)
		if (token.unauthorized) { throw Error() }

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
		// 	"publishedDatetime": "2018-08-04T05:42:52.766Z",
		// 	"title": "Irure consequat pariatur dolor qui esse sunt Lorem ad. (4)",
		// 	"slug": "news-item-4",
		// 	"content": {
		// 		"html": "<p>incididunt dolore laboris qui ad culpa animaliquip magna ut minim ipsum Lorem laborum ipsum anim aliqua consequat ullamco anim ut nostrud adipisicing cupidatat ut mollit laboris aute Lorem Lorem cupidatat eiusmod sit sint dolore qui sintconsectetur id labore tempor ad dolore quisest ad nulla aliquip aute duis deserunt adipisicing aute irure anim laboris exercitation minim irure quis occaecat deserunt adipisicing elitculpa sit exercitation sint nostrud adlaborum elit anim ea eiusmod consequat sint aliqua et exercitation id consequatvelit in duis mollit est adipisicing exercitation sint et nostrud sit eu cillum excepteur ex magna exercitation commodo utaliqua ex fugiat aliqua officia proident duis ad proident fugiat officia non nulla cupidatat id consequat ut qui ipsum nulla nisi nisi aliquip occaecat eu sint adipisicing ex anim ea tempor duis irure adipisicing deserunt ut</p>"
		// 	},
		// 	"summary": "Lorem ipsum et ad duis fugiat veniam pariatur duis est incididunt veniam officia consequat nostrud officia cupidatat fugiat laboris Lorem qui enim aliqua ut",
		// 	"cover": {
		// 		"url": "https://media.graphcms.com/KPZUYkD8RuC9GwlioGzU",
		// 		"summary": null,
		// 		"handle": "KPZUYkD8RuC9GwlioGzU"
		// 	},
		// 	"tags": [{
		// 			"tag": "tournament"
		// 		},
		// 		{
		// 			"tag": "broadcast"
		// 		},
		// 		{
		// 			"tag": "delete"
		// 		},
		// 		{
		// 			"tag": "1970s"
		// 		}
		// 	]
		// }


		return res.json({ article, tags })
	} catch (error) {
		console.log(error)
		return res.status(401).json({ error: 1, message: 'Unauthorized' })
	}

}
