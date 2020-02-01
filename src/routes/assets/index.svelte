<svelte:head><title>{process.env.LYNX_SITE_NAME} - Assets</title></svelte:head>

<IndexLayout {items} {items_count} {content_types} {subjects} {page_size}></IndexLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/assets/IndexLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/assets/IndexLayout.svelte'
	export let items
	export let items_count = 0
	export let content_types = []
	export let subjects = []
	export let page_size = 0
</script>
