<svelte:head>
	<title>{asset.title} | Assets | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(asset)} -->

<div class="layout-main" class:external>
	<div class="pre-texts">
		<h1>
			{asset.title}
			{#if asset.year}
				<span>({asset.year})</span>
			{/if}
		</h1>
		<h2 class="h6">Archive | {asset.contentType || 'Uncategorized'}</h2>
	</div>
	<div class:many class="assets-group" on:contextmenu={event => event.preventDefault()}>
		{#if all_assets.length > 1}
			<div class="thumbs">
				{#each all_assets as thumb, index}
					<div class="thumb" on:mouseover={() => selected = index} on:click={show_zoom}>
						<Asset asset={thumb} thumb={true}/>
					</div>
				{/each}
			</div>
		{/if}
		<div class="img" on:click={show_zoom}>
			<Asset asset={main_asset} magnifier={true}/>
		</div>
	</div>
	<div class="post-texts">
		<div class="content">
			{@html html}
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
	<Related {related}/>
</div>
{#if main_asset.url}
	<Zoom bind:zoomshow src={main_asset.url} alt={alt(main_asset)} width={main_asset.width} height={main_asset.height}/>
{/if}

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }) {
		const asset = await POST('/api/assets/single.json', { slug: params.slug })

		const related = { pageSize: 4 }
		if (asset.subject) {
			related.subject = asset.subject
		} else if (asset.contentType) {
			related.type = asset.contentType
		} else {
			related.decade = asset.year
		}
		let { items } = await POST('/api/assets/page.json', related)
		let index = items.findIndex(item => asset.id === item.id)
		index = index > -1 ? index : 3
		items.splice(index, 1)

		return { asset, related: items }
	}
</script>

<script>
	export let asset
	export let related = []
	import { src, alt } from '@johnny/utils/basic-utils'
	import Asset from '@johnny/svelte/Asset.svelte'
	import Related from '@johnny/svelte/archive/Related.svelte'
	import Zoom from '@johnny/svelte/archive/Zoom.svelte'
	let zoomshow = false

	$: all_assets = asset.assetLinks.concat(asset.assets)
	$: many = all_assets.length > 1
	let selected = 0
	$: main_asset = all_assets[selected]
	$: external = main_asset.link

	const show_zoom = () => {
		if (!external) {
			zoomshow = true
		}
	}

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = asset.detail.html ? asset.detail.html.replace(/<p><\/p>/gi, '') : ''

	$: decade = asset.year ? Math.floor(asset.year / 10) * 10 : undefined
	$: tags = asset.tags.map(tag => tag.tag)
		.concat(decade ? [`${decade}s`] : [])
		.concat(asset.contentType ? asset.contentType : [])
		.concat(asset.subject ? asset.subject : [])
</script>

<style type="text/scss">
	.pre-texts {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		text-align: center;
		max-width: 900rem;
		margin: 0 auto;
	}
	h1 {
		margin: 0 0 40rem;
		span { display: block; }
	}
	h2 {
		margin: 0 0 15rem;
		color: $red-main;
	}

	.assets-group {
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
	.external {
		.many .thumb,
		.img {
			cursor: default;
		}
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
