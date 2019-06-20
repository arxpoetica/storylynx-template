<h4>Tags:</h4>
<div class="tags">
	{#each tags as tag, index}
		<a href="/news">{tag}</a>
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
	}
	a {
		margin-right: 0.4rem;
		padding: 0 0.4rem;
		background-color: $gray-6;
		border: 1px solid $gray-4;
		cursor: pointer;
	}
</style>
