<svelte:head><title>{process.env.LYNX_SITE_NAME} - News</title></svelte:head>

<IndexLayout {items} {page_size} {items_count}></IndexLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/news/IndexLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/news/IndexLayout.svelte'
	export let items = []
	export let items_count = 0
	export let page_size = 0
</script>
