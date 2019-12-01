<nav>
	<ul>
		<!-- <li data-on="{section === 'experience'}"><a href="/experience" rel=prefetch>Experience</a></li> -->
		<li><a href="/archive" data-on="{section === 'archive'}" rel=prefetch>Archive</a></li>
		<li><a href="/about" data-on="{section === 'about'}" rel=prefetch>About</a></li>
		<li><a href="/news" data-on="{section === 'news'}" rel=prefetch>News</a></li>
		<li><a href="/contact" data-on="{section === 'contact'}" rel=prefetch>Contact</a></li>
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
		justify-content: flex-end;
		align-items: center;
	}
	ul {
		display: flex;
	}
	li {
		margin: 0 36rem 0 0;
		&:last-child { margin: 0; }
	}
	a {
		color: $black;
		text-decoration: none;
		&::before {
			content: '';
			display: block;
			height: 10rem;
		}
		&::after {
			content: '';
			display: block;
			position: relative;
			left: -2rem; // there's a weird positioning issue w/ this font, hence the negative spacing
			width: 0;
			height: 2px;
			margin: 8rem auto 0;
			background-color: $black;
			transition: width 0.3s ease-in-out;
		}
		&:hover::after,
		&:focus::after {
			width: 100%;
		}
		&[data-on=true] {
			// pointer-events: none;
			&::after { width: 100%; }
		}
	}
	@media (--small) {
		li {
			margin: 0 10rem;
			&:last-child { margin: 0 10rem; }
		}
	}
	@media (--smallest) {
		ul {
			flex-direction: column;
		}
		li {
			display: flex;
			justify-content: center;
			margin: 0 0 10rem;
			&:last-child { margin: 0; }
		}
	}
</style>
