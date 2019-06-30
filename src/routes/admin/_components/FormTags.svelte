{#if tagsCopy && tagsCopy.length}
	<div class="tags">
		{#each tagsCopy as tagObj, i (tagObj.id)}
			<div class="tag button tiny {tagObj.on ? 'success' : 'dull'}" on:click={() => toggleTag(tagObj)}>{tagObj.tag}</div>
		{/each}
	</div>
{/if}

<script>
	import { onMount } from 'svelte'
	export let tags
	export let articleCopy

	let tagsCopy
	onMount(() => {
		const tagIds = articleCopy.tags.map(tagObj => tagObj.id)
		tagsCopy = tags.map(tagObj => ({
			id: tagObj.id,
			tag: tagObj.tag,
			on: tagIds.indexOf(tagObj.id) > -1,
		}))
	})

	const toggleTag = tag => {
		// FIXME: MAINTAIN THE ORDER OF THE ARRAY!!!
		const index = articleCopy.tags.findIndex(tagObj => tagObj.id === tag.id)
		if (index > -1) {
			articleCopy.tags.splice(index, 1)
			articleCopy = articleCopy
			const copyIndex = tagsCopy.findIndex(tagObj => tagObj.id === tag.id)
			tag.on = false
			tagsCopy.splice(copyIndex, 1, tag)
			tagsCopy = tagsCopy
		} else {
			articleCopy.tags.push({ id: tag.id, tag: tag.tag })
			articleCopy = articleCopy
			tag.on = true
			tagsCopy.push(tag)
			tagsCopy = tagsCopy
		}
	}
</script>

<style type="text/scss">
	.tags {
		display: flex;
		flex-wrap: wrap;
		margin: 0 0 20rem;
	}
	.tag {
		margin: 4rem 4rem 0 0;
		text-transform: none;
		font: 13rem/1 $font;
	}
</style>
