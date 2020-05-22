<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<LayoutContent model="HTML Blocks" {...$$props}>
	<slot></slot>
	<LayoutHtmlBlocks/>
</LayoutContent>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/stories/HtmlBlocksLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import LayoutContent from 'storylynx/svelte/admin/components/layout/LayoutContent.svelte'
	import LayoutHtmlBlocks from 'storylynx/svelte/admin/components/layout/LayoutHtmlBlocks.svelte'
</script>
