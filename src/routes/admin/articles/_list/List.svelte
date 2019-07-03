<table>
	<thead>
		<ListHead/>
	</thead>
	<tbody>
		{#each items as item}
			<tr>
				<!-- <td><label><input type="checkbox" name="post[]" value="1"></label></td> -->
				<td>
					{#if item.cover}
						<div class="cover" style="background-image:url(https://media.graphcms.com/output=format:jpg/resize=w:59,h:59,fit:crop/{item.cover.handle});"></div>
					{:else}
						<div class="cover"></div>
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
	.cover {
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
