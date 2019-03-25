<!-- <h1>{$page.params.archive}</h1> -->
<!-- <p>{JSON.stringify(item)}</p> -->

<h1>{item.title}</h1>
<h2>{item.type}</h2>
<LazyImg src={item.src}/>
<p>{item.summary}</p>
<ul>
	{#each item.tags as tag}
		<li>{tag}</li>
	{/each}
</ul>

<!-- "timestamp": 1547764967174, -->
<!-- "timestampFormatted": "Jan 17, 2019", -->
<!-- "type": "image", -->
<!-- "id": "image-4", -->
<!-- "src": "" -->

<script context="module">
	export async function preload({ params }) {
		const res = await this.fetch('/json/sample-media-items.json', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
		})
		const items = await res.json()
		return { item: items[params.archive.split('-')[1]] }
	}
</script>

<script>
	// import { page } from '@sapper/app'
	import LazyImg from './_lazy-img.svelte'
	export let item
</script>
