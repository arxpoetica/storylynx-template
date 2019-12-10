<svelte:head>
	<title>{article.headline} | News | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<SlugLayout {article}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/news/SlugLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import SlugLayout from 'storylynx/svelte/news/SlugLayout.svelte'
	export let article
</script>
