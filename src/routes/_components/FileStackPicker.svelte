<div id="filestack-picker"></div>

<script>
	import { onMount } from 'svelte'
	import AES from 'crypto-js/aes'
	import UTF8 from 'crypto-js/enc-utf8'
	import { uid } from '@johnny/utils/basic-utils'
	import { POST } from '@johnny/utils/loaders'
	import { FileStackLoaded } from '@johnny/stores/admin-store'

	export let tab

	let key
	let token
	onMount(async() => {
		key = uid(50)
		const ciphertext = await POST('/api/admin/media/token.json', { key })
		token = AES.decrypt(ciphertext, key).toString(UTF8)
		if (!$FileStackLoaded) {
			const script = document.createElement('script')
			script.onload = async() => initPicker()
			script.src = '//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js'
			document.head.appendChild(script)
		} else {
			initPicker()
		}
	})
	async function initPicker() {
		FileStackLoaded.set(true)
		const client = filestack.init(token)
		const picker = client.picker({
			accept: ['image/*', 'video/*', 'audio/*'],
			displayMode: 'inline',
			container: '#filestack-picker',
			// exposeOriginalFile: true,
			fromSources: [
				'local_file_system',
				'url',
				// 'imagesearch',
				// 'facebook',
				// 'instagram',
				'googledrive',
				'dropbox',
			],
			maxFiles: 20,
			maxSize: 10 * 1024 * 1024, // 10MB
			// modalSize: [20, 20],
			uploadInBackground: false,
			// onFileSelected: file => {},
			onUploadDone: async(res) => {
				const assets = res.filesUploaded.map(file => ({
					handle: file.handle,
					fileName: file.filename, // note the case difference
					size: file.size,
					mimeType: file.mimetype, // note the case difference
				}))
				// TODO: tag as recent uploads
				const { items, items_count } = await POST('/api/admin/media/attach.json', { assets })
				tab = 'select'
			},
		})
		picker.open()
	}
</script>

<style type="text/scss">
	#filestack-picker {
		height: 100%;
		// & :global {
		// 	.fsp-picker,
		// 	.fsp-modal,
		// 	// .fsp-modal__sidebar,
		// 	// .fsp-header,
		// 	.fsp-modal__body,
		// 	.fsp-footer {
		// 		background-color: transparent;
		// 	}
		// }
	}
</style>
