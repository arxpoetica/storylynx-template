import { get } from 'svelte/store'
import { stores } from '@sapper/app'

// SEE: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598#gistcomment-2664601
export const createPaginationRange = (currentPage, pagesCount) => {
	const delta = 2

	let range = []
	const rangeStart = Math.max(2, currentPage - delta)
	const rangeMid = Math.min(pagesCount - 1, currentPage + delta)
	for (let index = rangeStart; index <= rangeMid; index++) {
		range.push(index)
	}

	if (currentPage - delta > 2) {
		range.unshift('...')
	}
	if (currentPage + delta < pagesCount - 1) {
		range.push('...')
	}

	range.unshift(1)
	range.push(pagesCount)

	return range
}

export const createQuery = newPage => {
	const { page } = stores()
	const { query } = get(page)
	const keys = Object.keys(query)
	const params = new URLSearchParams()
	for (let key of keys) {
		const value = query[key]
		if (key === 'page') {
			params.set('page', newPage)
		} else if (Array.isArray(value)) {
			for (let separateValue of value) {
				params.append(key, separateValue)
			}
		} else {
			params.set(key, value)
		}
	}
	return params.toString()
}
