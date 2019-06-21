<h4>Tags:</h4>
<div class="tags">
	{#each tags as tag}
		<a href="/news?page=1&tags={tag}">{tag}</a>
	{/each}
</div>

<script>
	export let tags = []
</script>

<style type="text/scss">
	h4 {
		margin: 0 0 0.4rem;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
	}
	a {
		margin: 0.4rem 0.4rem 0 0;
		padding: 0 0.4rem;
		background-color: $gray-6;
		border: 1px solid $gray-4;
		cursor: pointer;
	}
</style>
