{#if tags.length}
	<div class="tag-group">
		<h4>Tags:</h4>
		<div class="tags">
			{#each tags as tag}
				<a href="{url}?page=1&tags={tag}">{tag}</a>
			{/each}
		</div>
	</div>
{/if}

<script>
	export let url = '/'
	export let tags = []
</script>

<style type="text/scss">
	.tag-group {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h4 {
		margin: 0 0 15rem;
		font: $bold 13rem/16rem $font;
		letter-spacing: 2.4rem;
		text-transform: uppercase;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	a {
		margin: 0 10rem 10rem 0;
		padding: 0 10rem;
		height: 30rem;
		line-height: 30rem;
		color: $black;
		border: 1px solid #bfbfbf;
	}
</style>
