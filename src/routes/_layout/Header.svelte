<header>
	<div class="header-evil-wrap">
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
	.header-evil-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// max-width: $max;
		// height: $header-height;
		margin: 0 auto;
		padding: 0 20px;
	}
	.logo {
		background-image: url('');
		width: 200rem;
		height: 50rem;
	}
</style>
