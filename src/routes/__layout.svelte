{#if $page.path.indexOf('/stories') === 0 || $page.path.indexOf('/admin') === 0}
	<slot></slot>
{:else}
	<LayoutMain>
		<slot></slot>
	</LayoutMain>
{/if}

<script>
	import { page } from '$app/stores'
	import LayoutMain from 'storylynx/svelte/layout/LayoutMain.svelte'
</script>

<!-- <style lang="scss"></style> -->
