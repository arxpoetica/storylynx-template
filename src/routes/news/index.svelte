<svelte:head><title>Johnny Miller - News</title></svelte:head>

<h1>News</h1>
{#if items}
	<div class="news-items">
		{#each items as item}
			<p>
				{JSON.stringify(item)}
			</p>
			<!-- <MediaItem {item}/> -->
		{/each}
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	export async function preload() {
		const res = await this.fetch('/json/sample-news-items.json', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
		})
		const items = await res.json()
		return { items }
	}
</script>

<script>
	// import MediaItem from './_media-item.svelte'
	export let items
</script>

<style type="text/scss">
	.news-items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -0.6rem 2rem;
	}
</style>
