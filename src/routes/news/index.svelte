<svelte:head><title>{process.env.LYNX_SITE_NAME} - News</title></svelte:head>

<h1>News</h1>
<div class="layout-main">
	{#if items.length}
		<div class="news-items">
			{#each items as item}
				<NewsItem {item}/>
			{/each}
		</div>
		{#if itemsCount > pageSize}
			<Pagination href="/news" {page} {pageSize} {itemsCount}/>
		{/if}
	{:else}
		<h2>Loading . . .</h2>
	{/if}
</div>

<script context="module">
	import { POST } from 'storylynx/utils/loaders'
	export async function preload({ query }) {
		if (typeof query.page === 'undefined') {
			return this.redirect(302, 'news?page=1')
		}
		const { pageSize, items, itemsCount } = await POST('/api/articles/page.json', query)
		return { pageSize, items, itemsCount }
	}
</script>

<script>
	import Pagination from 'storylynx/svelte/page-lists/Pagination.svelte'
	import NewsItem from 'storylynx/svelte/news/NewsItem.svelte'
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()

	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)
</script>

<style type="text/scss">
	.news-items {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 0 40rem;
	}
	@media (--large-to-medium) {
		.news-items {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (--small-down) {
		.news-items {
			display: block;
		}
	}
</style>
