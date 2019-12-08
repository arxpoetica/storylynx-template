<!-- DEV ONLY -->
<!-- {#if Refresh}
	<svelte:component this={Refresh}/>
{/if} -->

<div class="site">
	<!-- {#if admin}
		<AdminBar/>
	{/if} -->
	<Header {section}/>
	<div class="layout-{section} layout-all">
		<main class="layout-outer">
			<div class="layout-inner">
				<slot></slot>
			</div>
		</main>
	</div>
	<Footer {section}/>
</div>

<script>
	import { onMount, setContext } from 'svelte'
	import { stores } from '@sapper/app'
	const { session, page } = stores()
	setContext('@sapper/app', { get_sapper_stores: () => ({ session, page }) })

	import Header from 'storylynx/svelte/layout/Header.svelte'
	// import AdminBar from './admin/_components/AdminBar.svelte'
	import Footer from 'storylynx/svelte/layout/Footer.svelte'

	// $: admin = $session.user || process.env.NODE_ENV === 'development'
	$: admin = $session.user

	// DOM ONLY STUFF ---------- >>>>
	let html
	$: section = $page.path === '/' ? 'home' : $page.path.split('/')[1]
	let priorSection
	$: if (process.browser && html) {
		if (admin) { html.classList.add('admin') }
		html.classList.remove(`${priorSection}-section`)
		html.classList.add(`${section}-section`)
		priorSection = section
	}

	// let Refresh = false
	onMount(async () => {
		// if (process.env.NODE_ENV === 'development') {
		// 	Refresh = (await import('./_refresh.svelte')).default
		// }
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
		:global(.admin) & {
			grid-template-areas:
				"admin header"
				"admin main"
				"admin footer"
			;
			grid-template-columns: 250rem 1fr;
		}
		& :global(> .admin-bar) {
			// grid-row: admin;
			// grid-column: admin;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			width: 250rem;
		}
		& :global(> header) {
			grid-row: header;
			grid-column: header;
		}
		& :global(> footer) {
			grid-row: footer;
			grid-column: footer;
		}
	}
	.layout-all {
		display: grid;
		grid-template-areas:
			"top"
			"bottom";
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;
		// flex: 1;
		grid-row: main;
		grid-column: main;
		margin: 0 auto;
		width: 100%;
	}
	// .layout-outer {
	// 	grid-row: top;
	// }
	.layout-inner {
		height: 100%;
	}
</style>
