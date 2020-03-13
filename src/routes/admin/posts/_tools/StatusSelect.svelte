<!-- {#if draftsCount || archivedCount}
	<button class="button {off === 'all' ? 'off' : 'link'}">All</button> ({itemsCount})
{/if}
{#if publishedCount}
	| <button class="button {off === 'published' ? 'off' : 'link'}">Published</button> ({publishedCount})
{/if}
{#if draftsCount}
	| <button class="button {off === 'drafts' ? 'off' : 'link'}">Drafts</button> ({draftsCount})
{/if}
{#if archivedCount}
	| <button class="button {off === 'trash' ? 'off' : 'link'}">Trash</button> ({archivedCount})
{/if}

<script>
	const { itemsCount, draftsCount, publishedCount, archivedCount } = $$props
	let off = 'all'
</script>

<style type="text/scss">
	.button {
		margin: 0;
	}
</style> -->
