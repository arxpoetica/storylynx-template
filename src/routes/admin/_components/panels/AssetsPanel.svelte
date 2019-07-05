<Panel title="Assets" type="assets">

	<div class="upload">
		{#if filelist.length}
			<AssetsList bind:filelist/>
		{:else}
			<label class="upload">
				<span>
					Drag & Drop your files or 
					<em>browse</em>
				</span>
				<input bind:this={file} accept="image/*,video/*,audio/*" type="file" multiple on:change={() => filelist = [...file.files]}/>
			</label>
		{/if}
	</div>

	<!-- <img src={articleCopy.cover.url} alt={articleCopy.cover.summary || 'No alt information.'}/> -->
</Panel>

<script>
	import { onMount } from 'svelte'
	import AES from 'crypto-js/aes'
	import UTF8 from 'crypto-js/enc-utf8'
	import { uid } from '@johnny/utils/basic-utils'
	import { POST } from '@johnny/utils/loaders'
	import Panel from './Panel.svelte'
	import AssetsList from '../AssetsList.svelte'
	export let articleCopy
	let file
	let filelist = []

	// /admin/api/assets/upload
	// post
	// multipart/form-data

	// function upload(index) {
	// 	// TODO:
	// }
	let key
	let token
	onMount(async() => {
		key = uid(50)
		const ciphertext = await POST('/admin/api/media/token.json', { key })
		token = AES.decrypt(ciphertext, key).toString(UTF8)
	})
</script>

<style type="text/scss">
	.upload {
		overflow: hidden;
		margin: 12rem 0;
		background-color: $gray-7;
		border-radius: 12rem;
	}
	label {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 24rem 12rem;
		font-weight: $bold;
		cursor: pointer;
	}
	em {
		text-decoration: underline;
		font-style: normal;
	}
	input[type="file"] {
		display: none;
	}
</style>
