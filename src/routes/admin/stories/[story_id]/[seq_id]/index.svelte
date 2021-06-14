<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<Sequence {...$$props}/>

<script context="module">
	import { loader } from 'storylynx/svelte/admin/stories/Sequence.load.js'
	export const load = loader
</script>

<script>
	import Sequence from 'storylynx/svelte/admin/stories/Sequence.svelte'
</script>
