<svelte:head><title>{import.meta.env.VITE_LYNX_SITE_NAME} - Posts</title></svelte:head>

<IndexLayout {...$$props}/>

<script context="module">
	import { loader } from 'storylynx/svelte/posts/IndexLayout.load.js'
	export const load = loader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/posts/IndexLayout.svelte'
</script>
