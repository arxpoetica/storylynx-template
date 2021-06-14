<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<QuickArrangeIndex {...$$props}>
	<slot></slot>
</QuickArrangeIndex>

<script context="module">
	import { loader } from 'storylynx/svelte/admin/assets/QuickArrangeIndex.load.js'
	export const load = loader
</script>

<script>
	import QuickArrangeIndex from 'storylynx/svelte/admin/assets/QuickArrangeIndex.svelte'
</script>
