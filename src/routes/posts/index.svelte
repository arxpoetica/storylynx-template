<svelte:head><title>{process.env.LYNX_SITE_NAME} - Posts</title></svelte:head>

<IndexLayout {...$$props}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/posts/IndexLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexLayout from 'storylynx/svelte/posts/IndexLayout.svelte'
</script>
