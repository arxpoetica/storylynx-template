<nav>
	<ul>
		<li data-on="{section === ''}"><a href="/" rel=prefetch>HOME</a></li>
		<!-- <li data-on="{section === 'experience'}"><a href="/experience" rel=prefetch>Experience</a></li> -->
	<!-- <li data-on="{section === 'tournaments'}"><a href="/tournaments">Tournaments</a></li> -->
		<li data-on="{section === 'experience'}"><a href="/experience" rel=prefetch>EXPERIENCE</a></li>
		<li data-on="{section === 'archive'}"><a href="/archive" rel=prefetch>ARCHIVE</a></li>
		<li data-on="{section === 'about'}"><a href="/about" rel=prefetch>ABOUT</a></li>
		<li data-on="{section === 'news'}"><a href="/news" rel=prefetch>NEWS</a></li>
		<li data-on="{section === 'contact'}"><a href="/contact" rel=prefetch>CONTACT</a></li>
		
	</ul>
</nav>

<script>
	export let section
	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<style type="text/scss">
	nav {
		margin-top:25rem;
		display: flex;
		justify-content: space-between;
		align-items: right;
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
			margin-bottom: 2rem;
			transition: text-decoration 0.15s ease-in-out;
			&:hover,
			&:focus {
				
				text-decoration: underline ;
			}
		}
		&[data-on=true] a {
			// border-bottom: 2rem solid black;
			text-decoration: underline;
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
