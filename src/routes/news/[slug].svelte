<svelte:head>
	<title>{article.title} | News | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(article)} -->
<div class="layout-main">
	<div class="box">
		<h1>{article.title}</h1>
		<h2>{formattedstamp(article.createdAt)}</h2>
		{#if asset}
			<div class="img">
				<LazyImg {src} {alt} width={asset.width} height={asset.height}/>
			</div>
		{/if}
		<div class="content">
			{@html article.detail.html || ''}
		</div>
		<Tags url="/news" {tags}/>
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
	import { formattedstamp, src as source } from '@johnny/utils/basic-utils'
	export let article

	import LazyImg from '@johnny/svelte/LazyImg.svelte'
	$: asset = article.assets ? article.assets[0] : false
	$: src = asset ? source(asset, { crop: true, height: Math.floor(asset.height / asset.width * 800), width: 800 }) : false
	$: alt = asset ? asset.summary : 'No description for this image.'

	import Tags from '@johnny/svelte/Tags.svelte'
	$: tags = article.tags.map(tag => tag.tag)
</script>

<style type="text/scss">
	.box {
		width: 100%;
		max-width: 800rem;
		margin: 0 auto;
	}
	.img {
		width: 100%;
		max-width: 800rem;
		margin: 0 auto 50rem;
	}
	h2 {
		margin: 0 0 20rem;
		text-align: center;
	}
</style>
