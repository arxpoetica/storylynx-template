<div class="panel {type}-panel {state}">
	<h2 on:click={togglePanel}>
		{title}
		<div class="svg">
			{#if state === 'open'}
				<CaretUp/>
			{:else}
				<CaretDown/>
			{/if}
		</div>
	</h2>
	<div class="guts">
		<slot></slot>
	</div>
</div>

<script>
	import CaretUp from '../../_svg/caret-up.svelte'
	import CaretDown from '../../_svg/caret-down.svelte'
	let state = 'open'
	export let type = 'default'
	export let title = 'Panel'
	function togglePanel() { state = state === 'open' ? 'shut' : 'open' }
</script>

<style type="text/scss">
	.panel {
		overflow: hidden;
		border-bottom: 1px solid $gray-6;
		&.shut {
			.guts { display: none; }
			h2 { border-bottom: 1px solid $gray-7; }
		}
		& :global {
			ul {
				list-style: none;
				margin: 0;
				padding: 0;
			}
			li {
				padding: 4rem 0;
			}
		}
	}
	h2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 8rem 12rem;
		background-color: $gray-7;
		font: $bold 15rem/1.2 $font;
		cursor: pointer;
		user-select: none;
	}
	.svg {
		flex-basis: 24rem;
	}
	.guts {
		padding: 8rem 12rem;
	}
</style>
