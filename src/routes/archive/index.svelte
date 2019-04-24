<svelte:head><title>Johnny Miller - Archive</title></svelte:head>

<h1>Archive</h1>
{#if items && items.length}
	<div class="media-items">
		{#each items as item}
			<MediaItem {item}/>
		{/each}
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	export async function preload() {
		const items = await (await this.fetch('/api/articles/page.json')).json()
		return { items }
	}
</script>

<script>
	import MediaItem from './_media-item.svelte'
	export let items = []

	// let items, pageNumber = 0, pageSize = 20;
	// $: items = sorted.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
</script>

<style type="text/scss">
	.media-items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -0.6rem 2rem;
	}
</style>
