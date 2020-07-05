<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<svelte:head>
	<title>Users | Admin | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<ViewContent model="Users" {...$$props}>
	<slot></slot>
</ViewContent>

<script context="module">
	import { preloader } from 'storylynx/svelte/admin/users/UsersLayout.preload.js'
	export const preload = preloader
</script>

<script>
	import ViewContent from 'storylynx/svelte/admin/components/layout/ViewContent.svelte'
</script>
