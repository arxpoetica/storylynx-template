<div class="media-select">
	<div class="tools">
		<div class="pagination">
			{#if items_count > page_size}
				<Pagination bind:page {page_size} {items} {items_count}/>
			{/if}
		</div>
		<div class="buttons">
			<button class="button success" {disabled} on:click={() => open = false}>
				Select
			</button>
		</div>
	</div>
	{#if selected.length}
		<div bind:this={selectedDiv} class="selected">
			<h2>Selected Items</h2>
			<div class="selected-items">
				{#each selected as item, index (item.id)}
					<div class="item" class:match={hovered.id === item.id}>
						<div class="img" style="background-image:url({src(item, { width: '300', height: '300' })})">
							<div on:click={() => remove(item)} class="close"><Close/></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<div class="media">
		<div class="items">
			{#each items as item, index (item.id)}
				<div
					on:click={() => toggleItem(item)}
					on:mouseenter={() => hovered = item}
					on:mouseleave={() => hovered = {}}
					class:on={isSelected(item)}
					class="item"
				>
					<div class="img" style="background-image:url({src(item, { width: '300', height: '300' })})">
						{#if isSelected(item)}
							<div class="star"><Star/></div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<script>
	import { beforeUpdate, tick } from 'svelte'
	import { POST } from '@johnny/utils/loaders'
	import { src } from '@johnny/utils/basic-utils'
	import Pagination from '../../_components/page-lists/Pagination.svelte'
	import Star from '@johnny/svg/icon-star.svelte'
	import Close from '@johnny/svg/icon-close.svelte'

	export let open
	$: disabled = !selected.length

	export let selected = []
	let selectedDiv
	let hovered = {}

	let page = 1
	let priorPage
	let items = []
	let items_count = 0
	let page_size = 0
	beforeUpdate(async() => {
		if (page !== priorPage) {
			priorPage = page
			items = []
			const res = await POST('/api/admin/media/page.json', { page })
			items = res.items
			items_count = res.items_count
			page_size = res.page_size
		}
	})
	async function toggleItem(item) {
		const index = selected.findIndex(sItem => sItem.id === item.id)
		if (index > -1) {
			selected.splice(index, 1)
			selected = selected
		} else {
			selected.push(item)
			selected = selected
		}
		await tick()
		if (selected.length) {
			selectedDiv.scrollTop = selectedDiv.scrollHeight
		}
	}
	$: isSelected = item => !!selected.find(sItem => sItem.id === item.id)
	function remove(item) {
		const index = selected.findIndex(sItem => sItem.id === item.id)
		selected.splice(index, 1)
		selected = selected
	}
</script>

<style type="text/scss">
	.media-select {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
	}
	.tools {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rem;
		border-bottom: 1px solid $gray-6;
	}
	.selected {
		overflow-y: auto;
		max-height: 200rem;
		padding: 20rem;
		border-bottom: 1px solid $gray-6;
		h2 {
			margin: 0 0 10rem;
			font-size: 14rem;
		}
	}
	.media {
		overflow-y: auto;
		padding: 20rem;
	}
	// .pagination {}
	.selected-items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(75rem, 1fr));
		grid-gap: 5rem;
		.img {
			top: 5rem;
			right: 5rem;
			bottom: 5rem;
			left: 5rem;
		}
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
			.close {
				display: flex;
			}
		}
		&.on {
			background-color: $yellow-l3;
		}
		&.match {
			background-color: $yellow-main;
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
		color: $black;
	}
	.star {
		position: absolute;
		display: flex;
		top: -20rem;
		right: -20rem;
		width: 30rem;
		height: 30rem;
		padding: 3rem;
		background-color: $yellow-main;
		border-radius: 100%;
		color: $white;
		z-index: 1;
	}
	.close {
		display: none;
		position: absolute;
		top: -5rem;
		right: -5rem;
		bottom: -5rem;
		left: -5rem;
		padding: 20rem;
		background-color: rgba(0, 0, 0, 0.8);
		color: $white;
	}
</style>
