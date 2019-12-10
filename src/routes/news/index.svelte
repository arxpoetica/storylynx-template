<svelte:head><title>{process.env.LYNX_SITE_NAME} - News</title></svelte:head>

<IndexLayout {items} {pageSize} {itemsCount}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/news/IndexLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/news/IndexLayout.svelte'
	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
</script>
