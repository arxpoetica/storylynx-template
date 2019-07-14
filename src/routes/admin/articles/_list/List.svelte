<table>
	<thead>
		<ListHead/>
	</thead>
	<tbody>
		{#each items as item}
			<tr>
				<!-- <td><label><input type="checkbox" name="post[]" value="1"></label></td> -->
				<td>
					{#if item.assets.length}
						<div class="assets" style="background-image:url({src(item.assets[0], { format: 'jpg', width: 59, height: 59, crop: true })});"></div>
					{:else}
						<div class="assets"></div>
					{/if}
				</td>
				<td>
					<a href="/admin/articles/edit/{item.id}">
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
				<td>Published <br>{dayjs(item.publishedDatetime).format('M/D/YYYY')}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<ListHead/>
	</tfoot>
</table>

<!-- <p>{item.summary}</p> -->

<script>
	import { src } from '@johnny/utils/basic-utils'
	import dayjs from 'dayjs'
	import ListHead from './ListHead.svelte'
	export let items
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
	// h3,
	// p {
	// 	margin: 0;
	// }
</style>
