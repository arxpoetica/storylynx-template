<div class="quill-component">
	<div class="toolbar">
		<button on:click={toggleHTML}>View HTML</button>
	</div>
	<div class="main-editor" class:htmlmode>
		<div bind:this={editor}></div>
	</div>
	<div class="html-editor" class:htmlmode>
		<textarea bind:value={htmltext}></textarea>
	</div>
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

	let htmlmode = false
	let htmltext = ''
	function toggleHTML() {
		if (htmlmode) {
			quill.setHTML(htmltext)
			htmlmode = false
		} else {
			htmltext = quill.getHTML()
			htmltext = htmltext === '<p><br></p>' ? '' : htmltext
			htmlmode = true
		}
	}
</script>

<style type="text/scss">
	.toolbar {
		display: flex;
		margin: 0 0 0.8rem;
	}
	button {
		margin-right: 1rem;
	}
	.main-editor {
		&.htmlmode {
			overflow: hidden;
			position: absolute;
			width: 1px;
			height: 1px;
			clip: rect(1px, 1px, 1px, 1px);
			clip-path: inset(0 100% 100% 0);
			opacity: 0;
			pointer-events: none;
		}
	}
	.html-editor {
		display: none;
		&.htmlmode {
			display: block;
		}
	}
	textarea {
		height: 40rem;
	}
</style>
