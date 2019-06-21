<nav>
	<ul>
		<li data-on="{segment === ''}"><a href="/" rel=prefetch>Home</a></li>
		<li data-on="{segment === 'experience'}"><a href="/experience" rel=prefetch>Experience</a></li>
		<li data-on="{segment === 'tournaments'}"><a href="/tournaments">Tournaments</a></li>
		<li data-on="{segment === 'archive'}"><a href="/archive" rel=prefetch>Archive</a></li>
		<li data-on="{segment === 'about'}"><a href="/about" rel=prefetch>About</a></li>
		<li data-on="{segment === 'news'}"><a href="/news" rel=prefetch>News</a></li>
		<li data-on="{segment === 'contact'}"><a href="/contact" rel=prefetch>Contact</a></li>
		<!-- <NavMenu {segment}/> -->
	</ul>
</nav>

<script>
	export let segment
	// import NavMenu from './NavMenu.svelte'
</script>

<style type="text/scss">
	nav {
		display: flex;
		align-items: center;
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
			line-height: 2.8rem;
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
			margin-bottom: 2rem;
		}
	}
</style>
