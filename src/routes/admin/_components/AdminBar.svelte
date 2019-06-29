<!-- {#if $session.user.admin}{/if} -->
<nav class="admin-bar">
	{#if $session.user}
		<div class="first">
			<h2>
				<div class="svg"><Article/></div>
				News Articles
			</h2>
			<div class="links">
				<a href="/admin/articles">All Articles</a>
				<a href="/admin/articles/new">Create Article</a>
			</div>
			<h2>
				<div class="svg"><Asset/></div>
				Archive Assets
			</h2>
			<div class="links">
				<a href="/admin/resources">All Assets</a>
				<a href="/admin/resources/new">Create Asset</a>
			</div>
		</div>
		<div class="second">
			<div class="div"></div>
			<a href="/auth/logout" class="auth" on:click={logout}>Log Out</a>
		</div>
	{:else}
		<div class="first">
			<div class="div"></div>
			<a href="/auth/login" class="auth">Log In</a>
			<div class="div"></div>
		</div>
	{/if}
</nav>

<script>
	import { stores } from '@sapper/app'
	const { session } = stores()
	import { POST } from '@johnny/utils/loaders'
	import Article from '../../_svg/admin-article.svelte'
	import Asset from '../../_svg/admin-asset.svelte'

	async function logout(event) {
		event.preventDefault()
		await POST('/api/auth/logout.json')
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
		border-bottom: 1px solid $gray-1;
		color: $gray-6;
		cursor: default;
	}
	.svg {
		flex-basis: 20rem;
		margin: 0 8rem 0 0;
	}
	.links {
		display: flex;
		flex-direction: column;
		padding: 8rem 10rem;
	}
	a {
		padding: 6rem 0;
		color: $gray-4;
		text-decoration: none;
		&:hover {
			color: $red-l1;
		}
	}
	.div {
		margin: 5rem 0 12rem;
		height: 1px;
		background-color: $gray-1;
	}
	.auth {
		text-align: center;
	}
</style>
