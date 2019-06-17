<svelte:head><title>Johnny Miller - News</title></svelte:head>

<h1>News</h1>

<ul>
	<li><a href="/news">nuthin'</a></li>
	<li><a href="/news?page=0">page: 0</a></li>
	<li><a href="/news?page=1">page: 1</a></li>
	<li><a href="/news?page=2">page: 2</a></li>
	<li><a href="/news?page=3">page: 3</a></li>
	<li><a href="/news?page=300">page: 300</a></li>
	<li><a href="/news?page=0&tags=family&tags=awards">page: 0, tag: family, awards</a></li>
</ul>

<p>params: {JSON.stringify($page.params)}</p>
<p>query: {JSON.stringify($page.query)}</p>

{#if items && items.length}
	<div class="news-items">
		{#each items as item}
			<NewsItem {item}/>
		{/each}
	</div>
	<!-- {#if showLoadMore}
		<button on:click={loadMore}>Load more</button>
	{:else}
		<p>You've reached the end of the news items.</p>
	{/if} -->
	<div class="pagination">
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	import { POST } from '../../server/utils/loaders'
	export async function preload({ query }) {
		if (typeof query.page === 'undefined') {
			return this.redirect(302, 'news?page=0')
		}
		const items = await POST('/api/articles/page.json', Object.assign({ pagesize: 3 }, query))
		return { items }
	}
</script>

<script>
	export let items = []
	import NewsItem from './_news-item.svelte'
	import { stores } from '@sapper/app'
	const { page } = stores()

	// let showLoadMore = true
	// let start = 0
	// async function loadMore() {
	// 	// FIXME: drop in native fetch polyfill
	// 	// FIXME: drop in native fetch polyfill
	// 	// FIXME: drop in native fetch polyfill
	// 	// FIXME: drop in native fetch polyfill
	// 	// FIXME: drop in native fetch polyfill
	// 	start += 3
	// 	const res = await fetch(`http://localhost:1337/news?published=true&_sort=createdAt:DESC&_limit=3&_start=${start}`)
	// 	const olderItems = await res.json()
	// 	if (olderItems.length < 3) { showLoadMore = false }
	// 	items = [...items, ...olderItems]
	// }
</script>

<style type="text/scss">
	.news-items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -0.6rem 2rem;
	}
</style>
