<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<IndexContent {...$$props}/>

<script context="module">
	import { loader } from 'storylynx/svelte/admin/stories/IndexContent.load.js'
	export const load = loader
</script>

<script>
	import IndexContent from 'storylynx/svelte/admin/stories/IndexContent.svelte'
</script>
