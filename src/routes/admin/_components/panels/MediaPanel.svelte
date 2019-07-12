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

	<!-- <img src={articleCopy.cover.url} alt={articleCopy.cover.summary || 'No alt information.'}/> -->
</Panel>

{#if open}
	<MediaModal bind:open {tab}/>
{/if}

<script>
	import Panel from './Panel.svelte'
	import MediaModal from '../MediaModal.svelte'
	import IconUpload from '@johnny/svg/icon-upload.svelte'
	export let articleCopy
	let open = false
	let tab
	// let filelist = []
	function openModal(which) {
		tab = which
		open = true
	}
</script>

<style type="text/scss">
	.buttons {
		margin: 0 -10rem;
	}
	.button {
		flex: 1;
	}
	.svg {
		flex-basis: 26rem;
		margin-left: -8rem;
	}
</style>
