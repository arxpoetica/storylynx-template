<!-- DEV ONLY -->
<!-- {#if Refresh}
	<svelte:component this={Refresh}/>
{/if} -->

{#if $page.path.indexOf('/stories') === 0}
	<LayoutStories>
		<slot></slot>
	</LayoutStories>
{:else if $page.path.indexOf('/admin') === 0}
	<LayoutAdmin>
		<slot></slot>
	</LayoutAdmin>
{:else}
	<LayoutMain>
		<slot></slot>
	</LayoutMain>
{/if}

<script>
	// LEAVE BELOW AS IS -- REMOVING WILL BREAK THE APP
	import { onMount, setContext } from 'svelte'
	import { stores } from '@sapper/app'
	const { session, page, goto } = stores()
	setContext('@sapper/app', { get_sapper_stores: () => ({ session, page, goto }) })
	// LEAVE ABOVE AS IS -- REMOVING WILL BREAK THE APP

	import LayoutMain from 'storylynx/svelte/layout/LayoutMain.svelte'
	import LayoutStories from 'storylynx/svelte/stories/LayoutStories.svelte'
	import LayoutAdmin from 'storylynx/svelte/admin/LayoutAdmin.svelte'

	// let Refresh = false
	// onMount(async () => {
	// 	if (process.env.NODE_ENV === 'development') {
	// 		Refresh = (await import('./_refresh.svelte')).default
	// 	}
	// })
</script>

<!-- <style type="text/scss"></style> -->
