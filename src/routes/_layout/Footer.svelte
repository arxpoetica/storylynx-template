<footer class="layout-outer">
	<nav class="layout-inner">
		<ul>
			<li><span>Copyright &copy; 2019 <br>Johnny Miller</span></li>
			<li><a href="/terms" data-on="{section === 'terms'}">Terms &amp; Conditions</a></li>
			<li><a href="/privacy" data-on="{section === 'privacy'}">Privacy Policy</a></li>
			<!-- <li><a href="/global-styles" data-on="{section === 'global-styles'}">Global Styles</a></li> -->
		</ul>
		<a class="cobrand" href="https://www.johnnymillerchampfoundation.org/" target="_blank">The Champ Foundation</a>
	</nav>
</footer>

<script>
	export let section;
</script>

<style type="text/scss">
	footer {
		padding-top: 40rem;
		padding-bottom: 50rem;
		background-color: $orange-light;
		color: $gray-3;
		font: $bold 13rem/1 $font;
		text-transform: uppercase;
		letter-spacing: 4rem;
	}
	.layout-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		padding: 16rem 0;
	}
	ul {
		display: flex;
	}
	ul {
		display: flex;
		margin: 0 0 40rem;
	}
	li {
		margin: 0 10rem;
	}
	span {
		display: block;
		padding: 6rem 0;
	}
	br { display: none; }
	a {
		color: $gray-3;
		text-decoration: none;
		&::before {
			content: '';
			display: block;
			height: 6rem;
		}
		&::after {
			content: '';
			display: block;
			position: relative;
			left: -2rem; // there's a weird positioning issue w/ this font, hence the negative spacing
			width: 0;
			height: 2px;
			margin: 4rem auto 0;
			background-color: $gray-3;
			transition: width 0.3s ease-in-out;
		}
		&:hover::after,
		&:focus::after {
			width: 100%;
		}
		&[data-on=true] {
			pointer-events: none;
			&::after { width: 100%; }
		}
	}
	.cobrand {
		color: black;
		&::after { width: 100%; }
	}
	@media (--medium-down) {
		ul {
			flex-direction: column;
		}
		li {
			display: flex;
			justify-content: center;
			text-align: center;
		}
		br { display: block; }
	}
</style>
