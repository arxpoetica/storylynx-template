<svelte:head><title>Johnny Miller - News</title></svelte:head>

<h1>News</h1>
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
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	export async function preload() {
		const items = await (await this.fetch('/api/articles.json')).json()
		return { items }
	}
</script>

<script>
	import NewsItem from './_news-item.svelte'
	export let items = []

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
