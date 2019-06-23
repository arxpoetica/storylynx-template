<div bind:this={menu} class="menu {open ? 'open' : 'shut'}">
	<div class="target" on:click={openMenu}>
		<Gear/>
	</div>
	<div class="dropdown">
		<ul>
			{#if $session.user}
				<li><h2>Admin</h2></li>
				{#if $session.user.admin}
					<li><a href="/admin/collections">Collections</a></li>
				{/if}
				<li class="div"></li>
				<li><a href="/auth/logout" on:click={logout}>Log Out</a></li>
			{:else}
				<li><a href="/auth/login">Log In</a></li>
			{/if}
		</ul>
	</div>
</div>

<script>
	import { beforeUpdate, onMount } from 'svelte'
	import { stores } from '@sapper/app'
	const { page, session } = stores()
	import Gear from '../_svg/icon-gear.svelte'
	import { POST } from '../../server/utils/loaders'

	let open = false
	let priorPath = $page.path
	beforeUpdate(() => {
		if ($page.path !== priorPath && open) {
			open = false
			priorPath = $page.path
		}
	})

	let menu
	import { target } from '../../stores/app-store.js'
	onMount(() => {
		// const listener = this.store.on('state', ({ current }) => {
		target.subscribe(clickedTarget => {
			if (clickedTarget && open) {
				if (menu.contains(clickedTarget)) { return }
				open = false
			}
		})
		// this.on('destroy', listener.cancel)
	})

	function openMenu() {
		open = !open
	}
	async function logout(event) {
		event.preventDefault()
		await POST('/api/auth/logout.json')
		window.location.reload(true)
	}
</script>

<style type="text/scss">
	.menu {
		position: relative;
		margin: 0 0 0 10px;
		font: 1.5rem/1 $font;
		cursor: pointer;
	}
	.target {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 2.2rem;
	}
	.dropdown {
		position: absolute;
		top: -999em;
		left: -999em;
		background-color: white;
		width: auto;
		min-width: 160px;
		margin-top: 12px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		// border-radius: 3px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		z-index: $z-front;
	}
	.open {
		.dropdown {
			top: 100%;
			right: 0;
			left: auto;
		}
	}
	ul {
		padding: 0.5rem 0;
	}
	li {
		&.div {
			margin: 0.5rem 0;
			height: 1px;
			background-color: $gray-6;
		}
	}
	h2 {
		margin: -0.5rem 0 0.5rem;
		padding: 0.6rem 1rem;
		font-size: inherit;
		background-color: $gray-light;
		border-bottom: 1px solid $gray-6;
		cursor: default;
	}
	a {
		display: block;
		padding: 0.2rem 1rem;
		color: $black;
		text-decoration: none;
		&:hover {
			// background-color: $yellow-main;
			background-color: $gray-light;
		}
	}
	@media (--small) {
		.menu {
			display: none;
		}
	}
</style>
