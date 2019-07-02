<!-- DEV ONLY -->
<!-- {#if Refresh}
	<svelte:component this={Refresh}/>
{/if} -->


<div class="site" class:admin>
	{#if admin}
		<AdminBar/>
	{/if}
	<Header {section}/>
	<main>
		<slot></slot>
	</main>
	<Footer {section}/>
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

	$: admin = $session.user || process.env.NODE_ENV === 'development'

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
	.site {
		display: grid;
		grid-template-areas:
			"header"
			"main"
			"footer"
		;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr;
		flex: 1;
		&.admin {
			grid-template-areas:
				"admin header"
				"admin main"
				"admin footer"
			;
			grid-template-columns: 250rem 1fr;
		}
		& :global(> header) {
			grid-row: header;
			grid-column: header;
		}
		& :global(> footer) {
			grid-row: footer;
			grid-column: footer;
		}
		& :global(> .admin-bar) {
			grid-row: admin;
			grid-column: admin;
		}
	}
	main {
		grid-row: main;
		grid-column: main;
		margin: 0 auto;
		width: 100%;
		max-width: $max;
		padding: 40rem 20rem 20rem;
		.admin & {
			max-width: none;
			padding: 0;
		}
	}
</style>
