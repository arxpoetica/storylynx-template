<svelte:head><title>Johnny Miller - Archive</title></svelte:head>

<BannerHeader title="Archive"/>
<div class="layout-main">
	<ArchiveToolbar bind:contentValue bind:decadeValue/>
	{#if items.length}
		<div class="archive">
			{#each items as item}
				<ArchiveItem {item}/>
			{/each}
		</div>
		{#if itemsCount > pageSize}
			<Pagination href="/archive" {page} {pageSize} {items} {itemsCount}/>
		{/if}
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
	import BannerHeader from '@johnny/svelte/BannerHeader.svelte'
	import Pagination from '@johnny/svelte/page-lists/Pagination.svelte'
	import ArchiveToolbar from '@johnny/svelte/archive/ArchiveToolbar.svelte'
	import ArchiveItem from '@johnny/svelte/archive/ArchiveItem.svelte'
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()

	let contentValue = ''
	let decadeValue = ''

	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)
</script>

<style type="text/scss">
	.archive {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 0 100rem;
	}
	@media (--large-to-medium) {
		.archive {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (--small-down) {
		.archive {
			display: block;
		}
	}
</style>
