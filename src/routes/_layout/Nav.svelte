<nav>
	<ul>
		<!-- <li data-on="{section === 'experience'}"><a href="/experience" rel=prefetch>Experience</a></li> -->
		<li data-on="{section === 'archive'}"><a href="/archive" rel=prefetch>Archive</a></li>
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
		justify-content: flex-end;
		align-items: center;
		font: $bold 13rem/1 $font;
		text-transform: uppercase;
		letter-spacing: 4rem;
	}
	ul {
		display: flex;
	}
	li {
		display: flex;
		margin: 0 18rem;
		// &[data-on=true] a {
		// 	// border-bottom: 2rem solid black;
		// 	text-decoration: underline;
		// 	color: $black;
		// 	font-weight: $bold;
		// 	cursor: default;
		// }
	}
	a {
		color: $black;
		text-decoration: none;
		&:hover::after,
		&:focus::after {
			width: 100%;
		}
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
			background-color: $black;
			transition: width 0.4s ease-in-out;
		}
	}
	@media (--small) {
		li {
			margin: 0 10rem;
		}
	}
	@media (--smallest) {
		ul {
			flex-direction: column;
		}
		li {
			justify-content: center;
		}
	}
</style>
