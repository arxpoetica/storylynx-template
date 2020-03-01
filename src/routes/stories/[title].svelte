<svelte:head>
	<title>Stories | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<NameLayout {story} {navigation}></NameLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/stories/NameLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import NameLayout from 'storylynx/svelte/stories/NameLayout.svelte'
	export let story
	export let navigation
</script>
