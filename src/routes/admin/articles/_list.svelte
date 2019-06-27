<div class="list">
	{#each items as item}
		<div class="item">
			<!-- <p>{item.id}</p> -->
			<p>{item.title}</p>
			<p>{item.publishedDatetime}</p>
			<!-- <p>{item.content}</p> -->
			<p>{item.summary}</p>
			<AdminTags tags={item.tags.map(tag => tag.tag)}/>
			<!-- <p>{item.cover}</p> -->
			<!-- <p>{item.tags}</p> -->
		</div>
	{/each}
</div>

<script>
	import AdminTags from '../_components/AdminTags.svelte'
	export let items
</script>

<style type="text/scss">
	.list {
		overflow: auto;
	}
	.item {
		margin: 0 0 0.5rem;
		padding: 0.6rem 1.2rem;
		background-color: $gray-light;
		border: 1px solid $gray-6;
		border-radius: 2px;
	}
</style>
