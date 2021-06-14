<svelte:head>
	<title>{asset_group.title} | Assets | {import.meta.env.VITE_LYNX_SITE_NAME}</title>
</svelte:head>

<IdLayout {asset_group}></IdLayout>

<script context="module">
	import { loader } from 'storylynx/svelte/assets/IdLayout.load.js'
	export const load = loader
</script>

<script>
	import IdLayout from 'storylynx/svelte/assets/IdLayout.svelte'
	export let asset_group
</script>
