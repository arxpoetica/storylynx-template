<!-- DEV ONLY -->
{#if Refresh}
	<svelte:component this={Refresh}/>
{/if}

<div class="layout">
	<Header segment={segment || 'home'}/>
	<main>
		<slot></slot>
	</main>
	<Footer segment={segment || 'home'}/>
</div>

<script>
	export let segment

	import { afterUpdate, onMount } from 'svelte'
	import { stores } from '@sapper/app'
	import { target } from '../stores/app-store.js'
	import Header from '../components/layout/Header.svelte'
	import Footer from '../components/layout/Footer.svelte'

	const { session } = stores()
	const { user } = $session

	let Refresh = false
	onMount(async () => {
		if (process.env.NODE_ENV === 'development') {
			Refresh = (await import('./_refresh.svelte')).default
		}
		// DOM ONLY STUFF ---------- >>>>
		document.addEventListener('click', event => target.set(event.target))
		const html = document.querySelector('html')
		html.classList.add(user ? 'auth' : 'no-auth')
		setTimeout(() => html.classList.remove('preloaded'), 150)
	})
</script>

<style type="text/scss">
	.layout {
		position: relative;
	}
	main {
		margin: 0 auto;
		width: 100%;
		max-width: $max;
		padding: 40px 20px 20px;
	}
</style>
