<svelte:head>
	<title>Login | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<LoginLayout/>

<script context="module">
	import { if_user_redirect } from 'storylynx/utils/preload-utils.js'
	export const preload = if_user_redirect
</script>

<script>
	import LoginLayout from 'storylynx/svelte/auth/LoginLayout.svelte'
</script>

<!-- <style type="text/scss"></style> -->
