{#each [1, 2, 3] as count, index}
	<div class="column column-{count}">
		<ClipAsset
			{index} {clip} {intersecting} {options}
			style={animate_asset(elem, clip, index, intersecting, $story_scroll)}
		/>
	</div>
{/each}

<script>
	export let clip
	export let elem
	export let intersecting

	// FIXME: need to think through how to handle sizes and pass them along as more than just src sizes???
	// FIXME: how do we adapt for responsive????
	const options = { width: 475, height: 1000 }

	import ClipAsset from 'storylynx/svelte/stories/media/ClipAsset.svelte'

	import { story_scroll } from 'storylynx/stores/story-store.js'
	import { animate_asset } from './_template-helpers.js'
</script>

<style type="text/scss">
	.column {
		position: relative;
	}
</style>
