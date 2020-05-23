<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<IndexContent {...$$props}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/stories/IndexContent.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexContent from 'storylynx/svelte/admin/stories/IndexContent.svelte'
</script>
