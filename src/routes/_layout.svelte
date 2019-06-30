<!-- DEV ONLY -->
<!-- {#if Refresh}
	<svelte:component this={Refresh}/>
{/if} -->

<div class="layout">
	{#if $session.user || process.env.NODE_ENV === 'development'}
		<AdminBar/>
	{/if}
	<div class="site">
		<Header {section}/>
		<main>
			<slot></slot>
		</main>
		<Footer {section}/>
	</div>
</div>

<script>
	import { onMount } from 'svelte'
	import { stores } from '@sapper/app'
	const { session } = stores()
	import { target } from '@johnny/stores/app-store'
	import { hyphenate } from '@johnny/utils/basic-utils'

	import Header from './_layout/Header.svelte'
	import AdminBar from './admin/_components/AdminBar.svelte'
	import Footer from './_layout/Footer.svelte'

	// DOM ONLY STUFF ---------- >>>>
	let html
	export let segment
	$: section = segment ? segment : 'home'
	let priorSection
	$: {
		if (process.browser && html) {
			html.classList.remove(`${priorSection}-section`)
			html.classList.add(`${section}-section`)
			priorSection = section
		}
	}

	// let Refresh = false
	onMount(async () => {
		// if (process.env.NODE_ENV === 'development') {
		// 	Refresh = (await import('./_refresh.svelte')).default
		// }
		document.addEventListener('click', event => target.set(event.target))
		html = document.querySelector('html')
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
		padding: 40rem 20rem 20rem;
		:global(.admin-section) & {
			max-width: none;
			padding: 0;
		}
	}
</style>
