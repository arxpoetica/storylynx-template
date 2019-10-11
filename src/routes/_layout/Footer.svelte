<footer class="layout-outer">
	<div class="layout-inner">
		<ul>
			<li> <b>&copy; Copyright 2019</b> </li>
			<li><a data-on="{section === 'terms'}" href="/terms">Terms &amp; Conditions</a></li>
			<li><a data-on="{section === 'privacy'}" href="/privacy-policy">Privacy Policy</a></li>
			<li><a data-on="{section === 'global-styles'}" href="/global-styles">Global Styles</a></li>
		</ul>
		<a class="cobranding" href="https://www.johnnymillerchampfoundation.org/" target="_blank">The Champ Foundation</a>
	</div>
</footer>

<script>
	export let section;
</script>

<style type="text/scss">
	footer {
		height: 150rem;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: $orange-light;
		color: $black;
		font: 13rem/1 $font;
		a {
			height: 28px;
			padding: 0 8px;
			border-radius: 1px;
			color: $black;
			line-height: 28rem;
			text-decoration: none;
			transition: background-color 0.15s ease-in-out;
			&:hover,
			&:focus {
				text-decoration: underline;
			}
			&.cobranding {
				margin-left: auto;
			}
		}
		b {
			height: 28px;
			padding: 0 8px;
			border-radius: 1px;
			color: $black;
			line-height: 28rem;
		}
	}
	.layout-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		padding: 16rem 0;
	}
	ul {
		display: flex;
	}
	li {
		display: flex;
		margin: 0 2px;
		a {
			height: 28px;
			padding: 0 8px;
			border-radius: 1px;
			color: $black;
			line-height: 28rem;
			text-decoration: none;
			// margin-bottom: 2rem;
			transition: text-decoration 0.15s ease-in-out;
			&:hover,
			&:focus {
				
				text-decoration: underline ;
			}
			&[data-on=true] {
				text-decoration: underline;
				color: $black;
				font-weight: $bold;
				cursor: default;
			}
		}
	}
</style>
