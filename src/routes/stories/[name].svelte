<svelte:head>
	<title>Stories | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<NameLayout {modal}></NameLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/modals/NameLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import NameLayout from 'storylynx/svelte/modals/NameLayout.svelte'
	export let modal
</script>
