<!-- <svelte:head><title>...</title></svelte:head> -->

<h1>{item.title}</h1>
<h2>{formattedstamp(item.createdAt)}</h2>
<h4>Tags:</h4>
<div class="tags">
	{#each tags as tag, index}
		<strong>{tag}</strong>
	{/each}
</div>

<div class="content">
	{@html item.content.html}
</div>

<script context="module">
	import { POST } from '../../server/utils/loaders'
	export async function preload({ params }) {
		const item = await POST('/api/articles/single.json', { id: params.article })
		return { item }
	}
</script>

<script>
	import { formattedstamp } from '../../server/utils/basic-utils'
	export let item
	$: tags = item.tags.map(tag => tag.tag)
</script>

<!-- <style type="text/scss"></style> -->
