<!-- <svelte:head>
	<title>{user && user.username ? user.username : 'Loading...'} Profile</title>
</svelte:head> -->

<!-- {JSON.stringify(article)} -->

<h1>{article.title}</h1>
<h2>{formattedstamp(article.createdAt)}</h2>
<h4>Tags:</h4>
<div class="tags">
	{#each tags as tag, index}
		<strong>{tag}</strong>
	{/each}
</div>

<div class="content">
	{@html article.content.html}
</div>

<script context="module">
	import { POST } from '../../server/utils/loaders'
	export async function preload({ params }) {
		const article = await POST('/api/articles/single.json', { id: params.article })
		return { article }
	}
</script>

<script>
	import { formattedstamp } from '../../server/utils/basic-utils'
	export let article
	$: tags = article.tags.map(tag => tag.tag)
</script>

<!-- <style type="text/scss"></style> -->
