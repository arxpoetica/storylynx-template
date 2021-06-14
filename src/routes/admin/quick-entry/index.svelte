<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<QuickEntryIndex {...$$props}>
	<slot></slot>
</QuickEntryIndex>

<script context="module">
	import { loader } from 'storylynx/svelte/admin/assets/QuickEntryIndex.load.js'
	export const load = loader
</script>

<script>
	import QuickEntryIndex from 'storylynx/svelte/admin/assets/QuickEntryIndex.svelte'
</script>
