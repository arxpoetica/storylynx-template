<tr>
	<th class="col-checkbox"><input on:click={uncheck} bind:checked type="checkbox"></th>

	{#each cols as col}
		{#if col.sort}
			<th class="action col-{col.type}">
				<div on:click={() => resort(col.col)} class="sort">
					{col.title}
					{#if column === col.col}
						{#if sort === 'asc'}
							<div class="svg"><CaretUp/></div>
						{:else}
							<div class="svg"><CaretDown/></div>
						{/if}
					{/if}
				</div>
			</th>
		{:else}
			<th class="col-{col.type}">
				{col.title}
			</th>
		{/if}
	{/each}
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
	export let cols
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
		goto(`${window.location.pathname}?${params.toString()}`, { replaceState: true })
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
		&.col-checkbox,
		&.col-asset {
			width: 1rem;
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
