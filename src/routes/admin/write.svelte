<h1>Write Something new</h1>
<div bind:this={editor}></div>

<script>
	import { onMount } from 'svelte'

	let editor
	let quill
	onMount(async() => {
		const Quill = (await import('quill/dist/quill.js')).default
		quill = new Quill(editor, {
			debug: process.env.NODE_ENV === 'developer' ? 'info' : false,
			placeholder: 'Write your text here...',
			// readOnly: true,
			theme: 'snow',
		})
	})
</script>
