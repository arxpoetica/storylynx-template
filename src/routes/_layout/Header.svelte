<header>
	<div class="header-evil-wrap">
		<!-- <a class="logo" href="/">
			<div class="ghost">Johnny Miller</div>
			{#if $session.user}
				<AuthLogo/>
			{:else}
				<NoAuthLogo/>
			{/if}
		</a> -->
		<Nav {section}/>
	</div>
</header>

<script>
	export let section
	import Nav from './Nav.svelte'
	// import AuthLogo from '@johnny/svg/logo-header.svg'
	// import NoAuthLogo from '@johnny/svg/logo-header-noauth.svg'
</script>

<style type="text/scss">
	header {
		background-color: $bg2;
		color: $black;
		font: $bold 15rem/1 $font;
		z-index: $z-front;
	}
	.header-evil-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// max-width: $max;
		height: $header-height;
		margin: 0 auto;
		padding: 0 20px;
	}
</style>
