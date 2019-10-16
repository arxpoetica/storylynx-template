<svelte:head><title>Johnny Miller - Assets</title></svelte:head>

<BannerHeader title="Archive"/>
<div class="layout-main">
	{#if items.length}
		<div class="archive">
			{#each items as asset}
				<Asset {asset}/>
			{/each}
		</div>
	{:else}
		<h2>Loading . . .</h2>
	{/if}
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }) {
		if (typeof query.page === 'undefined') {
			return this.redirect(302, 'archive?page=1')
		}
		const { pageSize, items, itemsCount } = await POST('/api/assets/page.json', query)
		return { pageSize, items, itemsCount }
	}
</script>

<script>
	import { onMount } from 'svelte'
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()
	import BannerHeader from '../_components/BannerHeader.svelte'
	import Asset from './_components/Asset.svelte'

	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)
</script>

<style type="text/scss">
	.archive {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -20rem 20rem;
	}
</style>
