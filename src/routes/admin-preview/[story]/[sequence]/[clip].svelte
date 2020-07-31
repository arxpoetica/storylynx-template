<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin-preview FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<Preview {story}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/stories/Preview.preload.js'
	export const preload = preloader
</script>

<script>
	import Preview from 'storylynx/svelte/admin/stories/Preview.svelte'
	export let story
</script>
