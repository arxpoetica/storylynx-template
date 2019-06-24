<nav class="admin-bar">
	{#if $session.user}
		<div class="first">
			<h2>Create / New</h2>
			{#if $session.user.admin}
				<a href="/admin/articles/new">News Article</a>
				<a href="/admin/resources/new">Archival Resource</a>
			{/if}
			<h2>View / Edit</h2>
			<a href="/admin/articles">News Articles</a>
			<a href="/admin/resources">Archival Resources</a>
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
	import { POST } from '../../server/utils/loaders'

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
		flex-basis: 25rem;
		height: 100vh;
		background-color: $black;
		color: $gray-4;
		font: 1.5rem/1 $font;
	}
	.first,
	.second {
		display: flex;
		flex-direction: column;
	}
	h2 {
		margin: 0 0 1.2rem;
		padding: 1rem;
		font-size: inherit;
		background-color: $gray-dark;
		border-bottom: 1px solid $gray-1;
		color: $gray-6;
		cursor: default;
	}
	a {
		margin: 0 0 1.2rem;
		padding: 0 1rem;
		color: $gray-4;
	}
	.div {
		margin: 0.5rem 0 1.2rem;
		height: 1px;
		background-color: $gray-1;
	}
	.auth {
		text-align: center;
	}
</style>
