<svelte:head>
	<title>Stories | {process.env['LYNX_SITE_NAME']}</title>
</svelte:head>

<StoryPage {story}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/stories/StoryPage.preload.js'
	export const preload = preloader
</script>

<script>
	import StoryPage from 'storylynx/svelte/stories/StoryPage.svelte'
	export let story
</script>
