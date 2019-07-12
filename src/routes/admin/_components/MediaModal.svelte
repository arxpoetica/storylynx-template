<div class="modal">
	<div class="bg" on:click={() => open = false}>
		<div class="close"><IconClose/></div>
	</div>
	<div class="box">
		<div class="head">
			<div class="tabs">
				<div on:click={() => select('select')} class="tab {tab === 'select' ? 'on' : ''}">Select Media</div>
				<div on:click={() => select('upload')} class="tab {tab === 'upload' ? 'on' : ''}">Upload Media</div>
			</div>
		</div>
		<div class="body">
			{#if tab === 'select'}
				<MediaSelect/>
			{:else}
				<FileStackPicker/>
			{/if}
		</div>
		<!-- <div class="foot"></div> -->
	</div>
</div>

<script>
	import IconClose from '@johnny/svg/icon-close.svelte'
	import MediaSelect from './MediaSelect.svelte'
	import FileStackPicker from './FileStackPicker.svelte'
	export let open
	export let tab = 'select'
	function select(which) {
		tab = which
	}
</script>

<style type="text/scss">
	.modal {
		display: flex;
		justify-content: center;
		// align-items: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: $z-front-modal;
	}
	.bg {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.close {
		flex-basis: 40rem;
		margin: 12rem;
		color: $white;
		cursor: pointer;
	}
	.box {
		display: flex;
		flex-direction: column;
		flex: 1;
		position: relative;
		margin: 100rem;
		background-color: $white;
	}
	.head {
		border-bottom: 1rem solid $gray-6;
	}
	.tabs {
		display: inline-flex;
	}
	.tab {
		padding: 20rem;
		border-right: 1rem solid $gray-6;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
		user-select: none;
		&:hover {
			background-color: $gray-7;
		}
		&.on {
			background-color: $gray-6;
			cursor: default;
		}
	}
	.body {
		overflow: auto;
		flex: 1;
		padding: 20rem;
	}
</style>
