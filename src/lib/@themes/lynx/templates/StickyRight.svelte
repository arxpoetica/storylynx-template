{#if assets_bin}
	<div class="scroll">
		{#each assets_bin as bin, index}
			{#if index > 0}
				<div class="scroll-panel column">
					<ClipAsset
						{index} {clip} {intersecting} {options}
						style={animate_asset(elem, clip, index, intersecting, $story_scroll)}
					/>
				</div>
			{/if}
		{/each}
	</div>
	<div class="sticky column {threshold}">
		{#each fixed_assets as asset, index}
			<div class="sticky-panel column" class:show={threshold > index / fixed_assets.length}>
				<ClipAsset overrides={[asset]} {clip} {intersecting} {options}/>
			</div>
		{/each}
	</div>
{/if}

<script>
	export let clip
	export let intersecting
	export let threshold
	export let elem

	import { story_scroll } from 'storylynx/stores/story-store.js'
	import { animate_asset } from './_template-helpers.js'
	import ClipAsset from 'storylynx/svelte/stories/media/ClipAsset.svelte'

	$: assets_bin = clip.assets_bin.length > 1 ? clip.assets_bin : undefined
	$: fixed_assets = assets_bin ? assets_bin[0].assets : undefined

	const options = { width: 600, height: 600, crop: true }
</script>

<style type="text/scss">
	.sticky {
		position: sticky;
		top: 0;
		height: calc(100vh - 100rem);
	}
	.sticky-panel {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.75s ease-in-out;
		&:first-child,
		&.show {
			opacity: 1;
		}
	}
	// .scroll {}
	.scroll-panel {
		position: relative;
		height: calc(100vh - 100rem);
	}
</style>
