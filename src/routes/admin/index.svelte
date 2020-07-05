<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<svelte:head>
	<title>Home | Admin | {process.env.LYNX_SITE_NAME}</title>
</svelte:head>

<IndexDashboard/>

<script>
	import IndexDashboard from 'storylynx/svelte/admin/IndexDashboard.svelte'
</script>
