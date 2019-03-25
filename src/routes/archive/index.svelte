<svelte:head><title>Johnny Miller - Archive</title></svelte:head>

<h1>Archive</h1>
{#if items}
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
		const res = await this.fetch('/json/sample-media-items.json', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
		})
		const items = await res.json()
		return { items }
	}
</script>

<script>
	import MediaItem from './_media-item.svelte'
	export let items
</script>

<style type="text/scss">
	.media-items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -0.6rem 2rem;
	}
</style>
