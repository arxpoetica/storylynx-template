<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<LayoutAdmin>
	<slot></slot>
</LayoutAdmin>

<script context="module">
	import { if_no_user_redirect } from 'storylynx/utils/preload-utils.js'
	export const preload = if_no_user_redirect
</script>

<script>
	import LayoutAdmin from 'storylynx/svelte/admin/components/layout/LayoutAdmin.svelte'
</script>
