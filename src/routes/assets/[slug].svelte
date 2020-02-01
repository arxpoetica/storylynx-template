<svelte:head>
	<title>{asset_group.title} | Assets | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<SlugLayout {asset_group}></SlugLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/assets/SlugLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import SlugLayout from 'storylynx/svelte/assets/SlugLayout.svelte'
	export let asset_group
</script>
