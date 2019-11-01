<svelte:head>
	<title>{article.title} | News | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(article)} -->
<div class="layout-main">
	<h1>{article.title}</h1>
	<h2>{formattedstamp(article.createdAt)}</h2>
	<h4>Tags:</h4>
	<div class="tags">
		{#each tags as tag, index}
			<strong>{tag}</strong>
		{/each}
	</div>

	<div class="content">
		{@html article.html}
	</div>
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }) {
		const article = await POST('/api/articles/single.json', { slug: params.slug })
		return { article }
	}
</script>

<script>
	import { formattedstamp } from '@johnny/utils/basic-utils'
	export let article
	$: tags = article.tags.map(tag => tag.tag)
</script>

<!-- <style type="text/scss"></style> -->
