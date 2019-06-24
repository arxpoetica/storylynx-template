<div class="editor">
	<div bind:this={editor}></div>
</div>

<script>
	import { onMount } from 'svelte'
	import { Quill } from '../../../stores/admin-store'
	let editor
	let quill
	let quillReady = false

	onMount(() => {
		registerQuill()
	})
	function registerQuill() {
		if (!quillReady) {
			if ($Quill) {
				quillReady = true
				quill = new $Quill(editor, {
					debug: process.env.NODE_ENV === 'developer' ? 'info' : false,
					placeholder: 'Write your text here...',
					// readOnly: true,
					theme: 'snow',
				})
			} else {
				setTimeout(registerQuill, 100)
			}
		}
	}
</script>
