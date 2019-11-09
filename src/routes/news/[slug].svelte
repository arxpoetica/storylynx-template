<svelte:head>
	<title>{article.headline} | News | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(article)} -->
<div class="layout-main">
	{#if asset}
		<div class="main-img">
			<LazyImg {src} {alt} width={asset.width} height={asset.height}/>
		</div>
	{/if}
	<div class="box">
		<h1>{article.headline}</h1>
		{#if article.subheadline}
			<h2>{article.subheadline}</h2>
		{/if}

		<div class="info-bar">
			{#if article.byline || formatted_stamp}
				<div class="info">
					{#if article.byline}
						<h3>{article.byline}</h3>
					{/if}
					{#if formatted_stamp}
						<h4>{formatted_stamp}</h4>
					{/if}
				</div>
			{/if}
		</div>

		<div class="content">
			{@html html}
		</div>
		{#if article.linkBack}
			<p class="source-article"><strong>Source article:</strong> <a href={article.linkBack} target="_blank">{article.linkBack}</a></p>
		{/if}
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
	import dayjs from 'dayjs'
	import { src as source } from '@johnny/utils/basic-utils'
	export let article

	import LazyImg from '@johnny/svelte/LazyImg.svelte'
	$: asset = article.assets ? article.assets[0] : false
	$: src = asset ? source(asset, { crop: true, height: Math.floor(asset.height / asset.width * 1000), width: 1000 }) : false
	$: alt = asset ? asset.summary : 'No description for this image.'

	$: formatted_stamp = article.publishedDatetime ? dayjs(article.publishedDatetime).format('MMMM D, YYYY') : false

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = article.detail.html ? article.detail.html.replace(/<p><\/p>/gi, '') : ''

	import Tags from '@johnny/svelte/Tags.svelte'
	$: tags = article.tags.map(tag => tag.tag)
</script>

<style type="text/scss">
	.main-img {
		overflow: hidden;
		width: 100%;
		max-width: 1000rem;
		max-height: 80vh;
		margin: -50rem auto 50rem;
	}
	.box {
		width: 100%;
		max-width: 800rem;
		margin: 0 auto;
	}
	h1 {
		margin: 0 0 40rem;
	}
	h2 {
		margin: -34rem 0 40rem;
		color: #8c8891;
		font: $light 19rem/1.15 $font;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.content {
		& :global {
			> p:first-child::first-letter {
				float: left;
				margin: -6rem 0 0 0;
				padding: 0 12rem 6rem 0;
				// background-color: red;
				font-size: 100rem;
				line-height: 80rem;
			}
			img {
				width: 100%;
				margin: 50rem 0;
				line-height: 0;
			}
			img + .source,
			img + .caption {
				margin: -44rem 0 50rem;
			}
			img + .source + .caption {
				margin: -48rem 0 50rem;
			}
			.source {
				color: #b2b2b2;
				font: $light 13rem/18rem $font;
			}
			.caption {
				font: $bold 13rem/18rem $font;
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

	.info-bar {
		margin: 0 0 40rem;
		padding: 10rem 0;
		border-top: 1px solid #cdccd0;
		border-bottom: 1px solid #cdccd0;
		// .info {}
		h3,
		h4 {
			font: 12rem/1.3 $font;
			letter-spacing: 1rem;
			text-transform: uppercase;
		}
		h4 {
			color: #8c8891;
		}
	}
	.source-article {
		margin: 25rem 0 50rem;
		padding: 25rem 0 0;
		border-top: 1px solid #cdccd0;
		strong {
			font: $bold 13rem/1.15 $font;
			text-transform: uppercase;
		}
	}
</style>
