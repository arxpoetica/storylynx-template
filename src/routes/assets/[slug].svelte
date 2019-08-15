<svelte:head>
	<title>{asset.title} | Assets | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(asset)} -->

<h1>{asset.title}</h1>
<h2>{formattedstamp(asset.createdAt)}</h2>
<h4>Tags:</h4>
<div class="tags">
	{#each tags as tag, index}
		<strong>{tag}</strong>
	{/each}
</div>

<div class="content">
	{@html asset.html}
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }) {
		const asset = await POST('/api/assets/single.json', { slug: params.slug })
		return { asset }
	}
</script>

<script>
	// export let segment
	import { formattedstamp } from '@johnny/utils/basic-utils'
	export let asset
	$: tags = asset.tags.map(tag => tag.tag)
</script>

<!-- <style type="text/scss"></style> -->
