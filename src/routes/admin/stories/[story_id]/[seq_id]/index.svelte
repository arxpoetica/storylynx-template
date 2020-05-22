<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<Sequence {sequence}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/stories/Sequence.preload.js'
	export const preload = preloader
</script>

<script>
	export let sequence = {}
	import Sequence from 'storylynx/svelte/admin/stories/Sequence.svelte'
</script>
