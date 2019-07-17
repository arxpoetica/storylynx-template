<table>
	<thead>
		<ListHead bind:checked bind:checkedItems {items}/>
	</thead>
	<tbody>
		{#each items as item, index}
			<tr>
				<td><input bind:checked={checkedItems[index]} type="checkbox"></td>
				<td>
					{#if item.assets.length}
						<div class="assets" style="background-image:url({src(item.assets[0], { format: 'jpg', width: 59, height: 59, crop: true })});"></div>
					{:else}
						<div class="assets"></div>
					{/if}
				</td>
				<td>
					<a href="/admin/articles/{item.id}">
						<h2>{item.title}</h2>
					</a>
				</td>
				<td>
					<div class="tags">
						{#if item.tags.length}
							{item.tags.map(tagObj => tagObj.tag).join(', ')}
						{:else}
							No tags.
						{/if}
					</div>
				</td>
				<td>
					<strong>{item.status.toLowerCase()}</strong> <br>
					{dayjs(item.publishedDatetime).format('M/D/YYYY')}
				</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<ListHead bind:checked bind:checkedItems {items}/>
	</tfoot>
</table>

<!-- <p>{item.summary}</p> -->

<script>
	import { stores } from '@sapper/app'
	import { src } from '@johnny/utils/basic-utils'
	import dayjs from 'dayjs'
	import ListHead from './ListHead.svelte'
	export let items
	export let checkedItems
	$: checked = items.length === checkedItems.filter(val => val).length

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
		min-width: 59rem;
		height: 59rem;
		margin-right: 12rem;
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
		&:last-child {
			text-transform: capitalize;
		}
	}
	[type="checkbox"] {
		margin: 0;
	}
	// h3,
	// p {
	// 	margin: 0;
	// }
</style>
