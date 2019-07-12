<div class="media-select">
	{#each items as item, index (item.id)}
		<div on:click={() => item.on = !item.on} class:on={item.on} class="item">
			<div class="img" style="background-image:url({src(item)})"></div>
		</div>
		<!-- <img src={src(item)} alt={item.fileName}/> -->
	{/each}
</div>

<script>
	import { onMount } from 'svelte'
	import { POST } from '@johnny/utils/loaders'

	let items = []
	let itemsCount = 0
	let pageSize = 0
	onMount(async() => {
		const res = await POST('/admin/api/media/page.json')
		items = res.items
		itemsCount = res.itemsCount
		pageSize = res.pageSize
	})

	// FIXME: put this in a utility
	function src(item) {
		return `${item.url.split(item.handle)[0]}resize=w:400,h:400/${item.handle}`
	}
</script>

<style type="text/scss">
	.media-select {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-gap: 20rem;
	}
	.item {
		position: relative;
		padding-bottom: 100%;
		background-color: $gray-7;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
		&:hover {
			background-color: $gray-6;
		}
		&.on {
			background-color: $black;
		}
	}
	.img {
		position: absolute;
		top: 10rem;
		right: 10rem;
		bottom: 10rem;
		left: 10rem;
		background: none no-repeat center transparent;
		background-size: contain;
	}
</style>
