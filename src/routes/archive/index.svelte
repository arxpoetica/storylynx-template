<svelte:head><title>Johnny Miller - Archive</title></svelte:head>

<h1>Archive</h1>
{#if formattedResources.length}
	<div class="resources">
		{#each formattedResources as resource}
			<Resource {resource}/>
		{/each}
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	import { POST } from '../../_server/utils/loaders'
	export async function preload() {
		const { resources, count } = await POST('/api/resources/page.json', {})
		return { resources, count }
	}
</script>

<script>
	import { extractThumb } from './_resource-helpers'

	import Resource from './_resource.svelte'
	export let count
	export let resources = []
	let formattedResources
	$: {
		formattedResources = resources.map(resource => {
			return {
				id: resource.id,
				title: resource.title,
				createdAt: resource.createdAt,
				thumb: extractThumb(resource),
				summary: resource.summary,
				tags: resource.tags.map(group => group.tag)
			}
		})
	}
	// let resources, pageNumber = 0, pageSize = 20;
	// $: resources = sorted.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
</script>

<style type="text/scss">
	.resources {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -0.6rem 2rem;
	}
</style>
