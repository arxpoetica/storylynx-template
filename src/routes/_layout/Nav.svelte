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
		margin: 0 18px;
		// &[data-on=true] a {
		// 	// border-bottom: 2rem solid black;
		// 	text-decoration: underline;
		// 	color: $black;
		// 	font-weight: $bold;
		// 	cursor: default;
		// }
	}
	a {
		// padding: 0 8px;
		color: $black;
		text-decoration: none;
		// transition: text-decoration 0.15s ease-in-out;
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
	// @media (--small) {
	// 	nav {
	// 		justify-content: center;
	// 		margin-bottom: 20rem;
	// 	}
	// }
</style>
