export const createWhere = ({ status = [], tags = [] }) => {
	let where = ''
	if (status.length || tags.length) {
		where = 'where: { AND: ['
		if (status.length) {
			where += '{ OR: ['
			where += status.map(stat => `{ status: ${stat} }`).join(' ')
			where += '] }'
		}
		where += tags.length ? tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(' ') : ''
		where += '] }'
	}
	// console.log(where)
	return where
}

export const query_string_to_json = query_string => {
	const pairs = query_string.split('&')
	var result = {}
	pairs.forEach(function(pair) {
		pair = pair.split('=')
		result[pair[0]] = decodeURIComponent(pair[1] || '')
	})
	return JSON.parse(JSON.stringify(result))
}
