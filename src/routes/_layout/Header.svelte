<header class="layout-outer">
	<div class="layout-inner">
		<a class="logo" href="/">
			<div class="ghost">Johnny Miller</div>
		</a>
		<Nav {section}/>
	</div>
</header>

<script>
	export let section
	import Nav from './Nav.svelte'
</script>

<style type="text/scss">
	header {
		background-color: $gray-light;
		color: $black;
		font: $bold 15rem/1 $font;
		// z-index: $z-front;
	}
	.layout-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		padding: 16rem 0;
	}
	.logo {
		width: 376rem;
		height: 95rem;
		background: url('/img/logo.png') no-repeat center transparent;
		background-size: contain;
	}
	@media (--medium-down) {
		.layout-inner {
			flex-direction: column;
			justify-content: flex-start;
		}
	}
	@media (--medium-to-small) {
		.logo { margin-bottom: 16rem; }
	}
	@media (--smallest) {
		.logo {
			width: 100%;
			height: 0;
			padding-bottom: 25.3%;
		}
	}
</style>
