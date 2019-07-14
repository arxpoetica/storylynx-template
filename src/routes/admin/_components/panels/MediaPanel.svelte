<Panel title="Media" type="media">

	<div class="buttons">
		<button class="button small" on:click={() => openModal('select')}>
			<div class="svg"><IconUpload/></div>
			Select Media
		</button>
		<button class="button warning small" on:click={() => openModal('upload')}>
			<div class="svg"><IconUpload/></div>
			Upload Media
		</button>
	</div>

	{#if selected.length}
		<div class="items">
			<div class="evil-dom">
				{#each selected as item, index (item.id)}
						<!-- on:click={() => remove(item)} -->
					<div class="item">
						<div class="img" style="background-image:url({src(item, { width: '300', height: '300' })})">
							<div on:click={() => remove(item)} class="close"><Close/></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<!-- <img src={articleCopy.cover.url} alt={articleCopy.cover.summary || 'No alt information.'}/> -->
</Panel>

{#if open}
	<MediaModal bind:open bind:tab bind:selected/>
{/if}

<script>
	import { src } from '@johnny/utils/basic-utils'
	import Panel from './Panel.svelte'
	import Close from '@johnny/svg/icon-close.svelte'
	import MediaModal from '../MediaModal.svelte'
	import IconUpload from '@johnny/svg/icon-upload.svelte'
	export let articleCopy
	let open = false
	let tab
	let selected = []
	function openModal(which) {
		tab = which
		open = true
	}
	function remove(item) {
		const index = selected.findIndex(sItem => sItem.id === item.id)
		selected.splice(index, 1)
		selected = selected
	}
</script>

<style type="text/scss">
	// .buttons {
	// 	margin: 0 -10rem;
	// }
	.button {
		flex: 1;
	}
	.svg {
		flex-basis: 26rem;
		margin-left: -8rem;
	}

	.items {
		overflow-y: auto;
		max-height: 300rem;
		margin: 8rem 0 0;
	}
	.evil-dom {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 8rem;
	}
	.item {
		position: relative;
		padding-bottom: 100%;
		background-color: $gray-7;
		cursor: pointer;
		&:hover .close {
			display: flex;
		}
	}
	.img {
		position: absolute;
		top: 5rem;
		right: 5rem;
		bottom: 5rem;
		left: 5rem;
		background: none no-repeat center transparent;
		background-size: contain;
	}
	.close {
		display: none;
		position: absolute;
		top: -5rem;
		right: -5rem;
		bottom: -5rem;
		left: -5rem;
		padding: 20rem;
		background-color: rgba(0, 0, 0, 0.8);
		color: $white;
	}

</style>
