<svelte:head>
	<title>{post.headline} | Posts | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<SlugLayout {post}></SlugLayout>

<script context="module">
	import { preloader } from 'storylynx/svelte/posts/SlugLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import SlugLayout from 'storylynx/svelte/posts/SlugLayout.svelte'
	export let post
</script>
