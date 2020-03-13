<!-- DEV ONLY -->
<!-- {#if Refresh}
	<svelte:component this={Refresh}/>
{/if} -->

{#if $page.path.indexOf('/stories') === 0 || $page.path.indexOf('/admin') === 0}
	<slot></slot>
{:else}
	<LayoutMain>
		<slot></slot>
	</LayoutMain>
{/if}

<script>
	// LEAVE BELOW AS IS -- REMOVING WILL BREAK THE APP
	import { onMount, setContext } from 'svelte'
	import { stores, goto } from '@sapper/app'
	const { session, page } = stores()
	setContext('@sapper/app', { get_sapper_stores: () => ({ session, page, goto }) })
	// LEAVE ABOVE AS IS -- REMOVING WILL BREAK THE APP

	import LayoutMain from 'storylynx/svelte/layout/LayoutMain.svelte'

	// let Refresh = false
	// onMount(async () => {
	// 	if (process.env.NODE_ENV === 'development') {
	// 		Refresh = (await import('./_refresh.svelte')).default
	// 	}
	// })
</script>

<!-- <style type="text/scss"></style> -->
