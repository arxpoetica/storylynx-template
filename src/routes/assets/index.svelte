<svelte:head><title>Johnny Miller - Assets</title></svelte:head>

<h1>Assets</h1>
{#if items.length}
	<div class="assets">
		{#each items as asset}
			<Asset {asset}/>
		{/each}
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }) {
		if (typeof query.page === 'undefined') {
			return this.redirect(302, 'assets?page=1')
		}
		const { pageSize, items, itemsCount } = await POST('/api/assets/page.json', query)
		return { pageSize, items, itemsCount }
	}
</script>

<script>
	import { onMount } from 'svelte'
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()
	import Asset from './_components/Asset.svelte'

	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)
</script>

<style type="text/scss">
	.assets {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -6rem 20rem;
	}
</style>
