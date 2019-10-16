<!-- <p>{JSON.stringify(asset)}</p> -->

<div class="asset">
	<a href="/archive/{asset.slug}" rel=prefetch>
		<LazyImg {src} {alt}/>
		<h2>{asset.title || '[This Asset has no title.]'}</h2>
		<h3>{formattedstamp(asset.publishedDatetime)}</h3>
	</a>
	<!-- <p>externalAssets: {asset.externalAssets}</p> -->
	<!-- <p>{asset.summary}</p> -->
	<!-- <h4>Tags:</h4>
	<div class="tags">
		{#each asset.tags.map(tag => tag.tag) as tag}
			<strong>{tag}</strong>
		{/each}
	</div> -->
</div>

<script>
	import { src as source, formattedstamp } from '@johnny/utils/basic-utils.js'
	import LazyImg from '../../../components/shared/LazyImg.svelte'
	export let asset

	// {#each item.assets as img}
	// 	<img src={img.url} alt={img.summary || 'nada'}/>
	// 	<!-- assets { id url summary handle mimeType filename } -->
	// {/each}
	// FIXME: have a better backup asset
	$: src =
		asset.assets.length
		? source(asset.assets[0], { crop: true })
		: 'https://wearehubgames-website.s3.amazonaws.com/hero/upload/775/logo-blank-big.svg'
	$: alt = asset.summary ? asset.summary : 'No description for this asset.'

	let summary = ''
	$: if (asset.summary) {
		summary = asset.summary
	// } else if (asset.content.text) { // FIXME: change content type to RichTextAST:
	// 	const text = asset.content.text
	// 	summary = text.length > 100 ? text.slice(0, 99).trim() + '...' : text
	} else {
		summary = 'No summary.'
	}
</script>

<style type="text/scss">
	.asset {
		flex: 1;
		max-width: 400rem;
		min-width: 200rem;
		margin: 0 20rem 12rem;
		// padding: 12rem 20rem;
		// background-color: $gray-7;
		// box-shadow: 0 0 2px $gray-5;
	}
	// h4 {
	// 	margin: 0 0 4rem;
	// }
	// .tags {
	// 	display: flex;
	// 	strong {
	// 		margin-right: 4rem;
	// 		padding: 0 4rem;
	// 		background-color: $gray-6;
	// 		border: 1px solid $gray-4;
	// 		cursor: pointer;
	// 	}
	// }
</style>
