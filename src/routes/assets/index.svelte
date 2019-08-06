<svelte:head><title>Johnny Miller - Assets</title></svelte:head>

<h1>Assets</h1>
{#if items.length}
	<div class="assets">
		{#each items as item}
			<div class="asset">
				{item.id}

				<p>id: {item.id}</p>
				<p>publishedDatetime: {item.publishedDatetime}</p>
				<p>title: {item.title}</p>
				<p>slug: {item.slug}</p>
				<p>summary: {item.summary}</p>
				{#each item.assets as img}
					<img src={img.url} alt={img.summary || 'nada'}/>
					<!-- assets { id url summary handle mimeType filename } -->
				{/each}
				<p>externalAssets: {item.externalAssets}</p>
				<p>
					tags: {item.tags.map(tag => tag.tag).join(', ')}
				</p>
			</div>
		{/each}
		<!-- {#each formattedResources as resource} -->
			<!-- <Asset {resource}/> -->
		<!-- {/each} -->
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
		const { pageSize, items, itemsCount } = await POST('/api/articles/page.json', query)
		return { pageSize, items, itemsCount }
	}
</script>

<script>
	import { onMount } from 'svelte'
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()
	// import { extractThumb } from './_asset-helpers'

	// import Asset from './_asset.svelte'
	export let items = []
	export let itemsCount = 0
	export let pageSize = 0
	$: page = parseInt($pageStore.query.page)


	// export let count
	// export let resources = []
	// let formattedResources
	// $: {
	// 	formattedResources = resources.map(resource => {
	// 		return {
	// 			id: resource.id,
	// 			title: resource.title,
	// 			createdAt: resource.createdAt,
	// 			thumb: extractThumb(resource),
	// 			summary: resource.summary,
	// 			tags: resource.tags.map(group => group.tag)
	// 		}
	// 	})
	// }
	// let resources, pageNumber = 0, pageSize = 20;
	// $: resources = sorted.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
</script>

<style type="text/scss">
	.assets {
		// display: flex;
		// flex-wrap: wrap;
		margin: 0 -6rem 20rem;
	}
	.asset {
		margin: 0 0 20rem;
		border: 1px solid gray;
	}
</style>
