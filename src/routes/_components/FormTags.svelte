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
	export let copy

	let tagsCopy
	onMount(() => {
		const tagIds = copy.tags.map(tagObj => tagObj.id)
		tagsCopy = tags.map(tagObj => ({
			id: tagObj.id,
			tag: tagObj.tag,
			on: tagIds.indexOf(tagObj.id) > -1,
		}))
	})

	const toggleTag = tag => {
		// FIXME: MAINTAIN THE ORDER OF THE ARRAY!!!
		const index = copy.tags.findIndex(tagObj => tagObj.id === tag.id)
		if (index > -1) {
			copy.tags.splice(index, 1)
			copy = copy
			const copyIndex = tagsCopy.findIndex(tagObj => tagObj.id === tag.id)
			tag.on = false
			tagsCopy.splice(copyIndex, 1, tag)
			tagsCopy = tagsCopy
		} else {
			copy.tags.push({ id: tag.id, tag: tag.tag })
			copy = copy
			tag.on = true
			tagsCopy.push(tag)
			tagsCopy = tagsCopy
		}
	}
</script>

<style lang="scss">
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
