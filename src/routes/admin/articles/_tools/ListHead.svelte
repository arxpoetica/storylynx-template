<tr>
	<th><input on:click={uncheck} bind:checked type="checkbox"></th>
	<th>Cover</th>
	<th class="action">
		<div on:click={() => resort('title')} class="sort">
			Title
			{#if column === 'title'}
				{#if sort === 'asc'}
					<div class="svg"><CaretUp/></div>
				{:else}
					<div class="svg"><CaretDown/></div>
				{/if}
			{/if}
		</div>
	</th>
	<th>Tags</th>
	<th class="action">
		<div on:click={() => resort('publishedDatetime')} class="sort">
			Date
			{#if column === 'publishedDatetime'}
				{#if sort === 'asc'}
					<div class="svg"><CaretUp/></div>
				{:else}
					<div class="svg"><CaretDown/></div>
				{/if}
			{/if}
		</div>
	</th>
</tr>

<script>
	import { get } from 'svelte/store'
	import { stores, goto } from '@sapper/app'
	const { page } = stores()

	// import { createQuery }
	import CaretDown from '@johnny/svg/caret-down.svelte'
	import CaretUp from '@johnny/svg/caret-up.svelte'

	export let checked
	export let checkedItems
	export let items
	function uncheck() {
		checkedItems = checked ? [] : [...Array(items.length)].map(item => true)
	}

	$: column = $page.query.column
	$: sort = $page.query.sort

	function resort(sorter) {
		const { query } = $page
		const params = new URLSearchParams()
		for (let key in query) {
			const value = query[key]
			if (key === 'column') {
				params.set(key, sorter)
			} else if (key === 'sort') {
				if (query.column === sorter) {
					params.set(key, query.sort === 'asc' ? 'desc' : 'asc')
				} else {
					params.set(key, query.sort)
				}
			} else {
				params.set(key, value)
			}
		}
		goto(`/admin/articles?${params.toString()}`, { replaceState: true })
	}
</script>

<style type="text/scss">
	th {
		&:first-child {
			vertical-align: middle;
		}
		&.action {
			color: $links;
			cursor: pointer;
			user-select: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	[type="checkbox"] {
		margin: 0;
	}
	.sort {
		display: flex;
		align-items: center;
	}
	.svg {
		flex-basis: 20rem;
	}
</style>
