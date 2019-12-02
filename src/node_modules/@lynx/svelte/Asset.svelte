<!-- <p>{JSON.stringify(asset)}</p> -->
<!-- <p>{console.log(asset)}</p> -->
<!-- FIXME: what about the case where there is no thumb for a video??? -->

{#if asset.link}
	<!-- TODO: MOVE THUMB INTERNAL ??? -->
	<!-- TODO: MOVE THUMB INTERNAL ??? -->
	<!-- TODO: MOVE THUMB INTERNAL ??? -->
	{#if thumb}
		<LazyImg src={src(asset.cover, { crop: true })} alt={alt(asset.summary)}/>
	{:else}
		<LazyVid src={asset.link} alt={alt(asset.summary)}/>
	{/if}
{:else}
	{#if asset.mimeType.indexOf('image') === 0}
		{#if magnifier}
			<Magnifier src={asset.url} alt={alt(asset)} {width} {height} {loaded}>
				<LazyImg src={asset.url} alt={alt(asset)} {width} {height} bind:loaded/>
			</Magnifier>
		{:else}
			<LazyImg src={src(asset, { crop: true })} alt={alt(asset)} {width} {height}/>
		{/if}
	{:else if asset.mimeType.indexOf('video') === 0}
		{#if thumb}
			<LazyImg src={src(asset.cover, { crop: true })} alt={alt(asset.summary)}/>
		{:else}
			<LazyVid src={asset.url} alt={alt(asset.summary)}/>
		{/if}
	{/if}
{/if}

<script>
	import { src, alt } from '@lynx/utils/basic-utils'
	import LazyImg from '@lynx/svelte/LazyImg.svelte'
	import LazyVid from '@lynx/svelte/LazyVid.svelte'
	import Magnifier from '@lynx/svelte/Magnifier.svelte'

	let loaded = false
	export let asset
	export let thumb = false
	export let magnifier = false

	$: width = asset.link ? '' : (thumb ? 100 : asset.width)
	$: height = asset.link ? '' : (thumb ? 100 : asset.height)
</script>

<!-- <style type="text/scss"></style> -->
