<table>
	<thead>
		<ListHead bind:checked bind:checkedItems {items} {cols}/>
	</thead>
	<tbody>
		{#each items as item, index}
			<tr>
				<td><input bind:checked={checkedItems[index]} type="checkbox"></td>
				{#each cols as col}
					<td>
						{#if col.type === 'asset'}
							{#if item[col.col] && item[col.col].length}
								<div class="assets" style="background-image:url({src(item[col.col][0], { format: 'jpg', width: 59, height: 59, crop: true })});"></div>
							{:else}
								<div class="assets"></div>
							{/if}
						{:else if col.type === 'url'}
							<a href="{col.url}{item[col.slug || col.col]}">
								<h2>{item[col.col]}</h2>
							</a>
						{:else if col.type === 'array'}
							{#if item[col.col].length}
								{item[col.col].map(obj => obj[col.mapper]).join(', ')}
							{:else}
								No tags.
							{/if}
						{:else if col.type === 'datetime'}
							<div class="datetime">
								{#if item.status}
									<strong>{item.status.toLowerCase()}</strong> <br>
								{/if}
								{dayjs(item[col.col]).format('M/D/YYYY')}
							</div>
						{:else if col.type === 'function'}
							{col.col(item)}
						{:else}
							{item[col.col]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<ListHead bind:checked bind:checkedItems {items} {cols}/>
	</tfoot>
</table>

<script>
	import { src } from '@johnny/utils/basic-utils'
	import dayjs from 'dayjs'
	import ListHead from './ListHead.svelte'
	export let cols
	export let items
	export let checkedItems
	$: checked = items.length === checkedItems.filter(val => val).length

	import { stores } from '@sapper/app'
	const { page } = stores()
	let priorQuery
	$: if (JSON.stringify(priorQuery) !== JSON.stringify($page.query)) {
		priorQuery = $page.query
		checkedItems = []
	}
</script>

<style type="text/scss">
	// table {
	// 	// label {
	// 	// }
	// 	input {
	// 		margin: 0;
	// 	}
	// }

	// .list {
	// 	overflow: auto;
	// }
	// a {
	// 	&:hover {
	// 	}
	// }
	.assets {
		width: 59rem;
		height: 59rem;
		// margin-right: 12rem;
		background-color: $gray-6;
	}
	h2 {
		font: inherit;
		font-weight: $bold;
	}
	td {
		&:first-child {
			vertical-align: middle;
		}
	}
	[type="checkbox"] {
		margin: 0;
	}
	.datetime strong {
		font-size: 10rem;
		text-transform: uppercase;
	}
	// h3,
	// p {
	// 	margin: 0;
	// }
</style>
