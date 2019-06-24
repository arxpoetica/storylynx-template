<!-- DEV ONLY -->
<!-- {#if Refresh}
	<svelte:component this={Refresh}/>
{/if} -->

<div class="layout">
	{#if $session.user || process.env.NODE_ENV === 'development'}
		<AdminBar/>
	{/if}
	<div class="site">
		<Header segment={segment || 'home'}/>
		<main>
			<slot></slot>
		</main>
		<Footer segment={segment || 'home'}/>
	</div>
</div>

<script>
	export let segment

	import { afterUpdate, onMount } from 'svelte'
	import { stores } from '@sapper/app'
	const { session } = stores()
	import { target } from '../stores/app-store.js'

	import Header from './_layout/Header.svelte'
	import AdminBar from './_layout/AdminBar.svelte'
	import Footer from './_layout/Footer.svelte'

	// let Refresh = false
	onMount(async () => {
		// if (process.env.NODE_ENV === 'development') {
		// 	Refresh = (await import('./_refresh.svelte')).default
		// }
		// DOM ONLY STUFF ---------- >>>>
		document.addEventListener('click', event => target.set(event.target))
		const html = document.querySelector('html')
		html.classList.add($session.user ? 'auth' : 'no-auth')
		setTimeout(() => html.classList.remove('preloaded'), 150)
	})
</script>

<style type="text/scss">
	.layout {
		display: flex;
		position: relative;
	}
	.site {
		flex: 1;
	}
	main {
		margin: 0 auto;
		width: 100%;
		max-width: $max;
		padding: 40px 20px 20px;
	}
</style>
