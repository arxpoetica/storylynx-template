<svelte:head>
	<title>{asset.title} | Assets | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

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
		<div class:video class="media" on:click={show_zoom}>
			<Asset asset={main_asset} magnifier={true}/>
		</div>
	</div>
	<div class="post-texts">
		<div class="detail">
			{@html html}
		</div>
		{#if asset.source}
			<h3 class="source h6">Source: {asset.source}</h3>
		{/if}
		<Tags url="/archive" {tags}/>
	</div>
</div>
{#if main_asset.url}
	<Zoom bind:zoomshow src={main_asset.url} alt={alt(main_asset)} width={main_asset.width} height={main_asset.height}/>
{/if}

<script context="module">
	import { POST } from 'storylynx/utils/loaders'
	export async function preload({ params }) {
		const asset = await POST('/api/assets/single.json', { slug: params.slug })
		return { asset }
	}
</script>

<script>
	export let asset
	import { src, alt } from 'storylynx/utils/basic-utils'
	import Asset from 'storylynx/svelte/Asset.svelte'
	import Zoom from 'storylynx/svelte/archive/Zoom.svelte'
	let zoomshow = false

	$: all_assets = asset.assetLinks.concat(asset.assets)
	$: many = all_assets.length > 1
	let selected = 0
	$: main_asset = all_assets[selected]
	$: video = main_asset.mimeType && main_asset.mimeType.split('/')[0] === 'video'
	$: external = main_asset.link

	const show_zoom = () => {
		if (!external && !video) {
			zoomshow = true
		}
	}

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = asset.detail.html ? asset.detail.html.replace(/<p><\/p>/gi, '') : ''

	import Tags from 'storylynx/svelte/Tags.svelte'
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
		margin: 0 0 12rem;
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
	.media {
		cursor: zoom-in;
		&.video {
			cursor: default;
		}
	}
	.external {
		.many .thumb,
		.media {
			cursor: default;
		}
	}
	.post-texts {
		max-width: 500rem;
		margin: 0 auto 100rem;
	}
	.detail {
		margin: 0 0 20rem;
	}
	.source {
		margin: 0 0 35rem;
	}
</style>
