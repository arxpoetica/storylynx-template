<div class="toolbar">
	<div class="tools">
		{#if checkedItems.filter(checked => checked).length}
			<button on:click={sendDispatch} class="button alert">
				Move Selected Items to Trash
			</button>
		{/if}
	</div>
	{#if itemsCount > pageSize}
		<div class="pagination">
			<Pagination href="/admin/articles" {page} {pageSize} {items} {itemsCount}/>
		</div>
	{/if}
</div>

<script>
	import { createEventDispatcher } from 'svelte'
	import Pagination from '../../../_components/page-lists/Pagination.svelte'
	export let page
	export let pageSize
	export let items
	export let itemsCount
	export let checkedItems

	const dispatch = createEventDispatcher()
	function sendDispatch() {
		dispatch('trashItems')
	}
</script>

<style type="text/scss">
	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: 0 0 20rem;
	}
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
