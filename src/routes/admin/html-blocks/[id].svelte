<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<SinglePostLayout {post} {tags}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/posts/SinglePostLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import SinglePostLayout from 'storylynx/svelte/admin/posts/SinglePostLayout.svelte'
	export let post
	export let tags
</script>
