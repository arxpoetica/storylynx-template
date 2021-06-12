<svelte:head><title>{import.meta.env.VITE_LYNX_SITE_NAME} - Home</title></svelte:head>

<h1>{import.meta.env.VITE_LYNX_SITE_NAME}</h1>
<ul>
	<li><a href="/assets">Visit your assets archive.</a></li>
	<li><a href="/posts">Check out some posts.</a></li>
</ul>

<!-- <script></script> -->

<style lang="scss">
	ul {
		list-style: none;
		display: grid;
		grid-auto-flow: column;
		grid-gap: 20rem;
		margin: 0;
		padding: 0;
	}
	li {
		flex: 1;
		position: relative;
		padding: 0 0 100%;
	}
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: 1px solid $gray-light;
		text-decoration: none;
		transition: border-color 0.2s ease-in-out;
		&:hover {
			border-color: $links;
		}
	}
</style>
