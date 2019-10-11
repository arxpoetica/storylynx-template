<svelte:head><title>Johnny Miller - News</title></svelte:head>

<BannerHeader title="News"/>

<!-- <ul>
	<li><a href="/news?page=1&tags=family&tags=awards">page: 1, tag: family, awards</a></li>
	<li><a href="/news?page=1&tags=1950s">tag: 1950s</a></li>
	<li><a href="/news?page=1&tags=1970s">tag: 1970s</a></li>
	<li><a href="/news?page=1&tags=1980s">tag: 1980s</a></li>
</ul>
<p>query: {JSON.stringify($pageStore.query)}</p>
<p>page: {page}</p>
<p>pageSize: {pageSize}</p>
<p>itemsCount: {itemsCount}</p> -->
<div class="layout-main">
	{#if items && items.length}
		<div class="news-items">
			{#each items as item}
				<NewsItem {item}/>
			{/each}
		</div>
		{#if itemsCount > pageSize}
			<Pagination href="/news" {page} {pageSize} {items} {itemsCount}/>
		{/if}
	{:else}
		<h2>Loading . . .</h2>
	{/if}
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }) {
		if (typeof query.page === 'undefined') {
			return this.redirect(302, 'news?page=1')
		}
		const { pageSize, items, itemsCount } = await POST('/api/articles/page.json', query)
		return { pageSize, items, itemsCount }
	}
</script>

<script>
	import BannerHeader from '../_components/BannerHeader.svelte'
	import Pagination from '../_components/page-lists/Pagination.svelte'
	import NewsItem from './_news-item.svelte'
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()

	// export let segment
	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)
</script>

<style type="text/scss">
	.news-items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -40rem 40rem;
	}
</style>
