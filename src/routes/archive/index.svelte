<svelte:head><title>Johnny Miller - Archive</title></svelte:head>

<BannerHeader title="Archive"/>
<div class="layout-main">
	<ArchiveToolbar
		bind:contentValue
		bind:decadeValue
		bind:subjectValue
		on:filter={filter}
		{content_types}
		{subjects}
	/>
	{#if items}
		{#if items.length}
			<div class="archive">
				{#each items as item}
					<ArchiveItem {item}/>
				{/each}
			</div>
			{#if itemsCount > pageSize}
				<Pagination href="/archive" {page} {pageSize} {items} {itemsCount}/>
			{/if}
		{:else}
			<h2>No content found.</h2>
		{/if}
	{:else}
		<h2>Loading . . .</h2>
	{/if}
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }) {
		if (typeof query.page === 'undefined') {
			return this.redirect(302, 'archive?page=1')
		}
		const { pageSize, items, itemsCount, content_types, subjects } = await POST('/api/assets/page.json', query)
		return { pageSize, items, itemsCount, content_types, subjects }
	}
</script>

<script>
	import BannerHeader from '@johnny/svelte/BannerHeader.svelte'
	import Pagination from '@johnny/svelte/page-lists/Pagination.svelte'
	import ArchiveToolbar from '@johnny/svelte/archive/ArchiveToolbar.svelte'
	import ArchiveItem from '@johnny/svelte/archive/ArchiveItem.svelte'
	import { query_string_to_json } from '@johnny/utils/api-utils'
	import { onDestroy } from 'svelte'
	import { stores, goto } from '@sapper/app'
	const { page: pageStore } = stores()
	import { search_term } from '@johnny/stores/app-store'

	export let items
	export let itemsCount = 0
	export let content_types = []
	export let subjects = []
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)
	$: contentValue = $pageStore.query.type || ''
	$: decadeValue = $pageStore.query.decade || ''
	$: subjectValue = $pageStore.query.subject || ''

	let initialized = false
	const unsubscribe = search_term.subscribe(term => {
		if (initialized) {
			filter({ detail: { key: 'search_term', value: $search_term } }, true)
		} else {
			initialized = true
		}
	})
	onDestroy(() => {
		unsubscribe()
		search_term.set('')
	})

	async function filter(event, is_search_term) {
		const params = new URLSearchParams((new URL(location)).search)
		const { key, value } = event.detail
		if (value) {
			params.set(key, value)
		} else {
			params.delete(key)
		}
		params.set('page', '1')

		// manually fetching and setting history state
		// because `goto` forces input blue
		// SEE: https://github.com/sveltejs/sapper/blob/a52bdb2f4e1a722f06134b4065da2a32969e12e2/runtime/src/app/app.ts#L191
		if (is_search_term) {
			const res = await POST('/api/assets/page.json', query_string_to_json(params.toString()))
			pageSize = res.pageSize
			items = res.items
			itemsCount = res.itemsCount
			content_types = res.content_types
			subjects = res.subjects
			history.pushState({}, '', `${location.pathname}?${params.toString()}`)
		} else {
			goto(`${location.pathname}?${params.toString()}`)
		}

	}
</script>

<style type="text/scss">
	.archive {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 0 100rem;
	}
	@media (--large-to-medium) {
		.archive {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (--small-down) {
		.archive {
			display: block;
		}
	}
</style>
