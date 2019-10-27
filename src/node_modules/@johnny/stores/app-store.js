import { writable/* , readable, derive */ } from 'svelte/store'

let initial_search_term = ''
if (process.browser) {
	const params = new URLSearchParams((new URL(location)).search)
	initial_search_term = params.get('search_term') || ''
}
export const search_term = writable(initial_search_term)

// if (process.env.NODE_ENV === 'development') {
// 	store.set({ dump: json => JSON.stringify(json) })
// 	window.store = store
// }
