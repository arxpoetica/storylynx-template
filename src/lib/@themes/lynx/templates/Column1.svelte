<ClipAsset
	index={0} {clip} {intersecting} {options}
	style={animate_asset(elem, clip, 0, intersecting, $story_scroll)}
/>

<script>
	export let clip
	export let elem
	export let intersecting

	// FIXME: how do we adapt for responsive????
	const options = { width: 1400, height: 1000, crop: true }

	import ClipAsset from 'storylynx/svelte/stories/media/ClipAsset.svelte'

	import { story_scroll } from 'storylynx/stores/story-store.js'
	import { animate_asset } from './_template-helpers.js'
</script>

<!-- <style type="text/scss"></style> -->
