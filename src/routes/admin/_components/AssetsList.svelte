<div class="files">
	{#each filelist as file, index (file.name)}
		<div class="file">
			<button class="button warning" on:click={() => remove(index)}>
				<AssetsClose/>
			</button>
			<div class="remainder">
				<div class="info">
					{file.name}
					<div class="size">{bytesFormat(file.size)}</div>
				</div>
				<button class="button">
					<AssetsUpload/>
				</button>
			</div>
		</div>
	{/each}
</div>
{#if filelist.length > 1}
	<button class="button all">Upload All</button>
{/if}

<script>
	import AssetsUpload from '../../_svg/assets-upload.svelte'
	import AssetsClose from '../../_svg/assets-close.svelte'
	import { bytesFormat } from '@johnny/utils/basic-utils'
	export let filelist = []
	function remove(index) {
		filelist.splice(index, 1)
		filelist = filelist
	}
</script>

<style type="text/scss">
	.files {
		padding: 10rem 12rem;
	}
	.file {
		display: flex;
		align-items: center;
		margin: 2rem 0;
		padding: 4rem 0;
		background-color: $white;
		border-radius: 5rem;
		.button {
			display: block;
			flex-basis: 26rem;
			min-width: 26rem;
			height: 26rem;
			margin: 0 8rem;
			padding: 0;
			border: 0;
			border-radius: 4rem;
		}
	}
	.remainder {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
	}
	.info {
		word-break: break-all;
		justify-self: flex-start;
	}
	.size {
		font: $bold 11rem/1 $font;
		text-transform: uppercase;
	}
	.all {
		margin: 0 0 10rem 12rem;
	}
</style>