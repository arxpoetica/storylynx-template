{#if $page.path.indexOf('/stories') === 0}
	<LayoutStories>
		<slot></slot>
	</LayoutStories>
{:else}
	<LayoutMain>
		<slot></slot>
	</LayoutMain>
{/if}

<script>
	import { setContext } from 'svelte'
	import { stores } from '@sapper/app'
	const { session, page, goto } = stores()
	setContext('@sapper/app', { get_sapper_stores: () => ({ session, page, goto }) })
	import LayoutMain from 'storylynx/svelte/layout/LayoutMain.svelte'
	import LayoutStories from 'storylynx/svelte/stories/LayoutStories.svelte'
</script>
