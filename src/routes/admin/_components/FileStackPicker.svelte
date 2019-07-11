<div id="filestack-picker"></div>

<script>
	import { onMount } from 'svelte'
	import AES from 'crypto-js/aes'
	import UTF8 from 'crypto-js/enc-utf8'
	import { uid } from '@johnny/utils/basic-utils'
	import { POST } from '@johnny/utils/loaders'
	import { FileStackLoaded } from '@johnny/stores/admin-store'

	let key
	let token
	let client
	let picker
	onMount(async() => {
		key = uid(50)
		const ciphertext = await POST('/admin/api/media/token.json', { key })
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
	function initPicker() {
		FileStackLoaded.set(true)
		client = filestack.init(token)
		picker = client.picker({
			accept: ['image/*', 'video/*', 'audio/*'],
			displayMode: 'inline',
			container: '#filestack-picker',
			fromSources: [
				'local_file_system',
				'url',
				'imagesearch',
				// 'facebook',
				// 'instagram',
				'googledrive',
				'dropbox',
			],
			maxFiles: 20,
			maxSize: 10 * 1024 * 1024, // 10MB
			// modalSize: [20, 20],
			uploadInBackground: false,
			onUploadDone: res => {
				console.log('TODO:!!!')
				console.log(res)
			},
		})
		picker.open()
		// const res = await client.retrieve('Pa3RX8PSR5272pOFl9kI', { metadata: true })
		// console.log(res)
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
