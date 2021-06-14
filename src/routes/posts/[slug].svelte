<svelte:head>
	<title>{post.headline} | Posts | {import.meta.env.VITE_LYNX_SITE_NAME}</title>
</svelte:head>

<SlugLayout {post}></SlugLayout>

<script context="module">
	import { loader } from 'storylynx/svelte/posts/SlugLayout.load.js'
	export const load = loader
</script>

<script>
	import SlugLayout from 'storylynx/svelte/posts/SlugLayout.svelte'
	export let post
</script>
