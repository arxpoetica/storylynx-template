<svelte:head>
	<title>Stories | {import.meta.env.VITE_LYNX_SITE_NAME}</title>
</svelte:head>

<StoryPage {story}/>

<script context="module">
	import { loader } from 'storylynx/svelte/stories/StoryPage.load.js'
	export const load = loader
</script>

<script>
	import StoryPage from 'storylynx/svelte/stories/StoryPage.svelte'
	export let story
</script>
