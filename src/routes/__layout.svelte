{#if $page.path.indexOf('/stories') === 0 || $page.path.indexOf('/admin') === 0}
	<slot></slot>
{:else}
	<LayoutMain>
		<slot></slot>
	</LayoutMain>
{/if}

<script context="module">
	// LEAVE BELOW AS IS -- REMOVING WILL BREAK THE APP
	import { goto } from '$app/navigation'
	import { session as app_session, page as app_page, goto as app_goto } from 'storylynx/stores/app-store.js'
	export async function preload(page, session) {
		app_session.set(session)
		app_page.set(page)
		app_goto.set(goto)
		return
	}
	// LEAVE ABOVE AS IS -- REMOVING WILL BREAK THE APP
</script>

<script>
	// LEAVE BELOW AS IS -- REMOVING WILL BREAK THE APP
	import { page } from '$app/stores'
	import { page as app_page_alt } from 'storylynx/stores/app-store.js'
	page.subscribe(value => $app_page_alt = value)
	// LEAVE ABOVE AS IS -- REMOVING WILL BREAK THE APP

	import LayoutMain from 'storylynx/svelte/layout/LayoutMain.svelte'
</script>

<!-- <style lang="scss"></style> -->
