<svelte:head>
	<title>Login | {import.meta.env.VITE_LYNX_SITE_NAME}</title>
</svelte:head>

<LoginLayout/>

<script context="module">
	import { if_user_redirect } from 'storylynx/utils/load-utils.js'
	export const load = if_user_redirect
</script>

<script>
	import LoginLayout from 'storylynx/svelte/auth/LoginLayout.svelte'
</script>

<!-- <style lang="scss"></style> -->
