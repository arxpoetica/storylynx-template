<div class="tags">
	<h4>Tags:</h4>
	{#each tags as tag}
		<div class="tag">{tag}</div>
	{/each}
</div>

<script>
	export let url = '/'
	export let tags = []
</script>

<style type="text/scss">
	h4 {
		margin: 4rem 4rem 0 0;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
	}
	.tag {
		margin: 4rem 4rem 0 0;
		padding: 0 4rem;
		background-color: $gray-6;
		border: 1px solid $gray-4;
	}
</style>
