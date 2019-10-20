<svelte:head>
	<title>{asset.title} | Assets | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(asset)} -->

<div class="layout-main">
	<div class="pre-texts">
		<h1>
			{asset.title}
			{#if asset.decade}
				<span>({asset.decade})</span>
			{/if}
		</h1>
		<h2 class="h6">Archive | {asset.contentType || 'Uncategorized'}</h2>
		<!-- <h2>{formattedstamp(asset.createdAt)}</h2> -->
	</div>
	<div class="img">
		<LazyImg {src} {alt}/>
	</div>
	<div class="content">
		{@html asset.html}
	</div>
</div>

<h4>Tags:</h4>
<div class="tags">
	{#each tags as tag, index}
		<strong>{tag}</strong>
	{/each}
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }) {
		const asset = await POST('/api/assets/single.json', { slug: params.slug })
		return { asset }
	}
</script>

<script>
	import { src as source, formattedstamp } from '@johnny/utils/basic-utils'
	import LazyImg from '@johnny/svelte/LazyImg.svelte'

	export let asset
	$: src = source(asset.assets.length ? asset.assets[0] : null, { crop: true })
	$: alt = asset.summary ? asset.summary : 'No description for this asset.'
	$: tags = asset.tags.map(tag => tag.tag)
</script>

<style type="text/scss">
	.pre-texts {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		text-align: center;
	}
	h1 span { display: block; }
	h2 {
		margin: 0 0 15rem;
		color: $red-main;
	}
</style>
