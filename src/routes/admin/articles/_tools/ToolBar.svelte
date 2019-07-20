<div class="toolbar">
	<div class="tools">

		<StatusSelect {...$$props}/>

		{#if checkedItems.filter(checked => checked).length}
			<button on:click={sendDispatch} class="button alert small">
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
	import StatusSelect from './StatusSelect.svelte'
	const { page, pageSize, items, itemsCount, draftsCount, publishedCount, archivedCount } = $$props
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
		margin: 0 0 10rem;
	}
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
