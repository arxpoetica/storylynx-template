<svelte:head>
	<title>{asset.title} | Assets | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<SlugLayout {asset}></SlugLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/archive/SlugLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import SlugLayout from 'storylynx/svelte/archive/SlugLayout.svelte'
	export let asset
</script>
