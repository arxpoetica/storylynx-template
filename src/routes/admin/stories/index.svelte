<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<IndexContent {stories}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/stories/IndexContent.preload.js'
	export const preload = preloader
</script>

<script>
	export let stories = []
	import IndexContent from 'storylynx/svelte/admin/stories/IndexContent.svelte'
</script>
