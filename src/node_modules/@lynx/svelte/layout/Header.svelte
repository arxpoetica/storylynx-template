<header class="layout-outer">
	<div class="layout-inner">
		<a class="logo" href="/">
			{process.env.LYNX_SITE_NAME}
		</a>
		<Nav {section}/>
	</div>
</header>

<script>
	export let section
	import Nav from './Nav.svelte'
</script>

<style type="text/scss">
	// header {
	// }
	.layout-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rem;
		padding-bottom: 20rem;
		@media (--medium-down) {
			flex-direction: column;
			justify-content: flex-start;
		}
	}
	.logo {
		text-align: center;
	}
</style>
