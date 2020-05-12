<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<LayoutContent model="Assets" {...$$props}>
	<slot></slot>
</LayoutContent>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/assets/AssetsLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import LayoutContent from 'storylynx/svelte/admin/components/layout/LayoutContent.svelte'
</script>
