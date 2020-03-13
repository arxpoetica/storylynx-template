<svelte:head>
	<title>Admin | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<UsersLayout {items} {items_count}/>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/users/UsersLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import UsersLayout from 'storylynx/svelte/admin/users/UsersLayout.svelte'
	export let items
	export let items_count
</script>
