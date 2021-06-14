<svelte:head><title>{import.meta.env.VITE_LYNX_SITE_NAME} - Assets</title></svelte:head>

<IndexLayout {...$$props}/>

<script context="module">
	import { loader } from 'storylynx/svelte/assets/IndexLayout.load.js'
	export const load = loader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/assets/IndexLayout.svelte'
</script>
