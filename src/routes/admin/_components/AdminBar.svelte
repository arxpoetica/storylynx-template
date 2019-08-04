<!-- {#if $session.user.role}{/if} -->
<nav class="admin-bar">
	{#if $session.user}
		<div class="first">
			<h2 class:on={path.indexOf('/admin/articles') === 0}>
				<div class="svg"><Article/></div>
				News Articles
			</h2>
			<div class="links">
				<a href="/admin/articles" class:on={path === '/admin/articles'}>All Articles</a>
				<a href="/admin/articles/new" class:on={path === '/admin/articles/new'}>Create Article</a>
				<!-- <a href="/admin/articles/categories">Article Categories</a> -->
				<!-- <a href="/admin/articles/tags">Article Tags</a> -->
			</div>
			<h2 class:on={path.indexOf('/admin/assets') === 0}>
				<div class="svg"><Asset/></div>
				Archive Assets
			</h2>
			<div class="links">
				<a href="/admin/assets" class:on={path === '/admin/assets'}>All Assets</a>
				<a href="/admin/assets/new" class:on={path === '/admin/assets/new'}>Create Asset</a>
				<!-- <a href="/admin/assets/categories">Asset Categories</a> -->
				<!-- <a href="/admin/assets/tags">Asset Tags</a> -->
			</div>
			<h2 class:on={path.indexOf('/admin/media') === 0}>
				<div class="svg"><Media/></div>
				Media
			</h2>
			<div class="links">
				<a href="/admin/media" class:on={path === '/admin/media'}>All Media</a>
				<a href="/admin/media/upload" class:on={path === '/admin/media/upload'}>Upload Media</a>
			</div>
		</div>
		<div class="second">
			<h2>
				<div class="svg"><Settings/></div>
				Settings
			</h2>
			<div class="links">
				<a href="/admin/accounts">All Accounts</a>
				<a href="/admin/accounts/{$session.user.username}">Edit Your Account</a>
				<div class="div"></div>
				<a href="/auth/logout" on:click={logout}>Log Out</a>
			</div>
		</div>
	{:else}
		<div class="first">
			<h2>
				<div class="svg"><Settings/></div>
				<a href="/auth/login" class="auth">Log In</a>
			</h2>
		</div>
	{/if}
</nav>

<script>
	import { stores } from '@sapper/app'
	const { session, page } = stores()
	$: path = $page.path
	import { GET } from '@johnny/utils/loaders'
	import Settings from '@johnny/svg/admin-settings.svelte'
	import Article from '@johnny/svg/admin-article.svelte'
	import Asset from '@johnny/svg/admin-asset.svelte'
	import Media from '@johnny/svg/admin-media.svelte'

	async function logout(event) {
		event.preventDefault()
		await GET('/api/auth/logout.json')
		window.location.reload(true)
	}
</script>

<style type="text/scss">
	.admin-bar {
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 250rem;
		height: 100vh;
		background-color: $black;
		color: $gray-4;
		font: 15rem/1 $font;
	}
	.first,
	.second {
		display: flex;
		flex-direction: column;
	}
	h2 {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 10rem;
		font-size: inherit;
		background-color: $gray-dark;
		color: $gray-6;
		cursor: default;
		&.on {
			background-color: $orange-l2;
			color: $black;
		}
	}
	.svg {
		flex-basis: 20rem;
		margin: 0 8rem 0 0;
	}
	.links {
		display: flex;
		flex-direction: column;
		padding: 8rem 6rem;
	}
	a {
		padding: 6rem;
		color: $gray-4;
		text-decoration: none;
		transition: none;
		&:hover {
			background-color: $gray-dark;
			transition: background-color 0.15s ease-in-out;
		}
		&.on {
			color: $orange-l2;
			font-weight: $bold;
			pointer-events: none;
		}
	}
	.div {
		margin: 5rem 0;
		height: 1px;
		background-color: $gray-1;
	}
</style>
