<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<IndexQuickentry {...$$props}>
	<slot></slot>
</IndexQuickentry>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/assets/IndexQuickentry.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexQuickentry from 'storylynx/svelte/admin/assets/IndexQuickentry.svelte'
</script>
