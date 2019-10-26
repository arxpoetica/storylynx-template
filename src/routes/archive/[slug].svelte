<svelte:head>
	<title>{asset.title} | Assets | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(asset)} -->

<div class="layout-main">
	<div class="pre-texts">
		<h1>
			{asset.title}
			{#if asset.year}
				<span>({asset.year})</span>
			{/if}
		</h1>
		<h2 class="h6">Archive | {asset.contentType || 'Uncategorized'}</h2>
	</div>
	<div class:many class="images-group">
		{#if images.length > 1}
			<div class="thumbs">
				{#each images as thumb, index}
					<div class="thumb" on:mouseover={() => selected = index} on:click={() => zoomshow = true}>
						<LazyImg src={src(thumb, { crop: true })} alt={alt(thumb)}/>
					</div>
				{/each}
			</div>
		{/if}
		<div class="img" on:click={() => zoomshow = true}>
			<LazyImg src={img.url} alt={alt(img)} width={img.width} height={img.height}/>
		</div>
	</div>
	<div class="post-texts">
		<div class="content">
			{@html asset.content}
		</div>
		{#if asset.source}
			<h3 class="source h6">Source: {asset.source}</h3>
		{/if}
		{#if tags.length}
			<div class="tag-group">
				<h4 class="h6">Tags:</h4>
				<div class="tags">
					{#each tags as tag, index}
						<div class="tag h6">{tag}</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
<Zoom bind:zoomshow src={img.url} alt={alt(img)} width={img.width} height={img.height}/>


<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }) {
		const asset = await POST('/api/assets/single.json', { slug: params.slug })
		return { asset }
	}
</script>

<script>
	export let asset
	import { src } from '@johnny/utils/basic-utils'
	import LazyImg from '@johnny/svelte/LazyImg.svelte'
	import Zoom from '@johnny/svelte/archive/Zoom.svelte'
	let zoomshow = false

	$: images = asset.assets
	$: many = images.length > 1
	let selected = 0
	$: img = images[selected]
	const alt = img => img.summary ? img.summary : 'No description for this asset.'

	$: decade = asset.year ? Math.floor(asset.year / 10) * 10 : undefined
	$: tags = asset.tags.map(tag => tag.tag)
		.concat(decade ? [`${decade}s`] : [])
		.concat(asset.contentType ? asset.contentType : [])
</script>

<style type="text/scss">
	.pre-texts {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		text-align: center;
	}
	h1 {
		margin: 0 0 40rem;
		span { display: block; }
	}
	h2 {
		margin: 0 0 15rem;
		color: $red-main;
	}

	.images-group {
		max-width: 720rem;
		margin: 0 auto 100rem;
	}
	.many {
		position: relative;
		padding-left: 110rem;
		max-width: 830rem;
		.thumbs {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			max-width: 100rem;
			overflow-y: auto;
		}
		.thumb {
			margin: 0 0 10rem;
			cursor: zoom-in;
			&:last-child { margin: 0; }
		}
	}
	.img {
		cursor: zoom-in;
	}

	.post-texts {
		max-width: 500rem;
		margin: 0 auto 100rem;
	}
	.content {
		margin: 0 0 20rem;
	}
	.source {
		margin: 0 0 35rem;
	}
	.tag-group {
		display: flex;
		h4 {
			margin-right: 12rem;
			line-height: 30rem;
		}
		.tags {
			display: flex;
			flex-wrap: wrap;
		}
		.tag {
			margin: 0 10rem 10rem 0;
			padding: 0 10rem;
			height: 30rem;
			line-height: 30rem;
			border: 1px solid #bfbfbf;
		}
	}
</style>
