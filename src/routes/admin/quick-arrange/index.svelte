<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<IndexQuickArrange {...$$props}>
	<slot></slot>
</IndexQuickArrange>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/assets/IndexQuickArrange.preload.js'
	export const preload = preloader
</script>

<script>
	import IndexQuickArrange from 'storylynx/svelte/admin/assets/IndexQuickArrange.svelte'
</script>
