import { shadow_and_gradient_files } from '../../scripts/data/archive-generate-data'
import { loremIpsum } from 'lorem-ipsum'
import { random } from '@johnny/utils/basic-utils'

const get_text = (from, to) => loremIpsum({ count: random(from, to), units: 'words' })
const get_html = (tag_name, from, to) => `<${tag_name}>${get_text(from, to)}</${tag_name}>`
const get_file_number = item => item.fileName.replace('JOHNNY_MILLER_IMG_', '').replace('.jpg', '')

export const compile = () => {
	const result = shadow_and_gradient_files.map(item => {
		return {
			// id
			publishedDatetime: (new Date()).toISOString(),
			title: `Archive Asset #${get_file_number(item)}`,
			slug: 'archival-asset-' + item.id + '-' + get_file_number(item),
			detail: `${get_html('p')}${get_html('p')}${get_html('p')}`,
			// summary: get_text(7, 20),
			// assets { id url summary handle mimeType fileName }
			assetId: item.id,
			// externalAssets
			// tags { tag }
		}
	})
	/* eslint-disable */
	console.log(JSON.stringify(result))
}
