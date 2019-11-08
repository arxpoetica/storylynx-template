<svelte:head>
	<title>{article.headline} | News | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(article)} -->
<div class="layout-main">
	<div class="box">
		<h1>{article.headline}</h1>
		<h2>{formattedstamp(article.createdAt)}</h2>
		{#if asset}
			<div class="img">
				<LazyImg {src} {alt} width={asset.width} height={asset.height}/>
			</div>
		{/if}
		<div class="content">
			{@html html}
		</div>
		{#if tags.length}
			<Tags url="/news" {tags}/>
		{/if}
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

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = article.detail.html ? article.detail.html.replace(/<p><\/p>/gi, '') : ''

	import Tags from '@johnny/svelte/Tags.svelte'
	$: tags = article.tags.map(tag => tag.tag)
</script>

<style type="text/scss">
	.box {
		width: 100%;
		max-width: 800rem;
		margin: 0 auto;
	}
	// h1 {
	// }
	.img {
		width: 100%;
		max-width: 800rem;
		margin: 0 auto 50rem;
	}
	h2 {
		margin: 0 0 20rem;
		text-align: center;
	}
	.content {
		& :global {
			img {
				margin: 50rem 0;
				line-height: 0;
			}
			img + .source,
			img + .caption {
				margin: -30rem 0 50rem;
			}
			img + .source + .caption {
				margin: -32rem 0 50rem;
			}
			.source {
				color: #b2b2b2;
				font: $light 13rem/1.2rem $font;
			}
			.caption {
				font: $bold 13rem/1.2rem $font;
				text-transform: uppercase;
			}
			img,
			.source,
			.caption {
				p {
					margin: 0;
				}
			}
		}
	}
</style>
