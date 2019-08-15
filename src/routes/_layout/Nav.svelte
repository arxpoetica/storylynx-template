<nav>
	<ul>
		<li data-on="{section === ''}"><a href="/" rel=prefetch>Home</a></li>
		<li data-on="{section === 'experience'}"><a href="/experience" rel=prefetch>Experience</a></li>
		<li data-on="{section === 'tournaments'}"><a href="/tournaments">Tournaments</a></li>
		<li data-on="{section === 'assets'}"><a href="/assets" rel=prefetch>Assets</a></li>
		<li data-on="{section === 'about'}"><a href="/about" rel=prefetch>About</a></li>
		<li data-on="{section === 'news'}"><a href="/news" rel=prefetch>News</a></li>
		<li data-on="{section === 'contact'}"><a href="/contact" rel=prefetch>Contact</a></li>
	</ul>
</nav>

<script>
	export let section
	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<style type="text/scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	ul {
		display: flex;
		align-items: center;
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
			transition: background-color 0.15s ease-in-out;
			&:hover,
			&:focus {
				background-color: $yellow-light;
			}
		}
		&[data-on=true] a {
			background-color: $yellow-light;
			color: $black;
			font-weight: $bold;
			cursor: default;
		}
	}
	@media (--small) {
		nav {
			justify-content: center;
			margin-bottom: 20rem;
		}
	}
</style>
