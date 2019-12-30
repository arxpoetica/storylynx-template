<svelte:head><title>{process.env.LYNX_SITE_NAME} - Archive</title></svelte:head>

<IndexLayout {items} {itemsCount} {content_types} {subjects} {pageSize}></IndexLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/archive/IndexLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/archive/IndexLayout.svelte'
	export let items
	export let itemsCount = 0
	export let content_types = []
	export let subjects = []
	export let pageSize = 0
</script>
