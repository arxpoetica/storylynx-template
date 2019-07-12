<div class="media-select">
	{#if itemsCount > pageSize}
		<div class="pagination">
			<Pagination bind:page {pageSize} {items} {itemsCount}/>
		</div>
	{/if}
	<div class="items">
		{#each items as item, index (item.id)}
			<div on:click={() => item.on = !item.on} class:on={item.on} class="item">
				<div class="img" style="background-image:url({src(item, { width: '300', height: '300' })})"></div>
			</div>
			<!-- <img src={src(item)} alt={item.fileName}/> -->
		{/each}
	</div>
</div>

<script>
	import { beforeUpdate } from 'svelte'
	import { POST } from '@johnny/utils/loaders'
	import { src } from '@johnny/utils/basic-utils'
	import Pagination from '../../_components/page-lists/Pagination.svelte'

	export let selected = []

	let page = 1
	let priorPage
	let items = []
	let itemsCount = 0
	let pageSize = 0
	beforeUpdate(async() => {
		if (page !== priorPage) {
			priorPage = page
			items = []
			const res = await POST('/admin/api/media/page.json', { page })
			items = res.items
			itemsCount = res.itemsCount
			pageSize = res.pageSize
		}
	})
</script>

<style type="text/scss">
	// .media-select {
	// }
	.pagination {
		margin: 0 0 20rem;
	}
	.items {
		display: grid;
		// this ridiculous number is the equivalent of 170rem max
		grid-template-columns: repeat(auto-fill, minmax(122.7rem, 1fr));
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
