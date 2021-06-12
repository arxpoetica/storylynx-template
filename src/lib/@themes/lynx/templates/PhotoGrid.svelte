<div class="photo-grid">
	<h2>{clip.slug || 'From the archive'}</h2>
	<div class="grid">
		{#each assets as asset, index}
			{#if index < 12 && assets.length}
				<div class="square">
					<ClipAsset overrides={[asset]} {clip} {intersecting} {options}/>
				</div>
			{/if}
		{/each}
	</div>
</div>

<script>
	export let clip
	// export let elem
	export let intersecting
	import ClipAsset from 'storylynx/svelte/stories/media/ClipAsset.svelte'
	$: assets = clip.assets_bin.length ? clip.assets_bin[0].assets : []
	const options = { width: 600, height: 600, crop: true }
</script>

<style lang="scss">
	.photo-grid {
		width: 100%;
		margin: 0 auto;
		padding: 85rem 0;
	}
	h2 {
		text-transform: uppercase;
		margin-bottom: 85rem;
		padding-bottom: 15rem;
		border-bottom: 1rem darkgray solid;
		letter-spacing: 2rem;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 15rem;
	}
	.square {
		position: relative;
		padding-bottom: 100%;
	}
</style>
