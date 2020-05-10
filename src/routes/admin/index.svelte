<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<svelte:head>
	<title>Home | Admin | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<AdminLayout/>

<!-- <script context="module">
	import { preloader } from 'storylynx/svelte/admin/AdminLayout.preload.js'
	export const preload = preloader
</script> -->

<script>
	import AdminLayout from 'storylynx/svelte/admin/AdminLayout.svelte'
</script>
