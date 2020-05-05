<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<svelte:head>
	<title>Posts | Admin | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<PostsLayout {items} {items_count}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/posts/PostsLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import PostsLayout from 'storylynx/svelte/admin/posts/PostsLayout.svelte'
	export let items
	export let items_count
</script>
