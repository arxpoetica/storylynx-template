<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<svelte:head>
	<title>Users | Admin | {import.meta.env.VITE_LYNX_SITE_NAME}</title>
</svelte:head>

<ViewContent model="Users" {...$$props}>
	<slot></slot>
</ViewContent>

<script context="module">
	import { loader } from 'storylynx/svelte/admin/users/UsersLayout.load.js'
	export const load = loader
</script>

<script>
	import ViewContent from 'storylynx/svelte/admin/components/layout/ViewContent.svelte'
</script>
