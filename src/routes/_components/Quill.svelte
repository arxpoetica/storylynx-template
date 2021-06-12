<div class="quill-component">
	<div class="toolbar">
		<h2>{title}</h2>
		<div class="button warning tiny" on:click={toggleHTML}>Edit {htmlmode ? 'as Content' : 'as HTML'}</div>
	</div>
	<div class="main-editor" class:htmlmode>
		<div bind:this={editor}></div>
	</div>
	{#if htmlmode}
		<TextArea bind:value={html}/>
	{/if}
</div>

<script>
	import { onMount } from 'svelte'
	import { Quill } from '@johnny/stores/admin-store'
	import TextArea from './TextArea.svelte'
	export let title = ''

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
				quill.setHTML(html)
				setTimeout(() => quill.on('text-change', () => html = quill.getHTML()), 0)
			} else {
				setTimeout(registerQuill, 100)
			}
		}
	}

	let htmlmode = false
	export let html = ''
	function toggleHTML() {
		if (htmlmode) {
			quill.setHTML(html)
			htmlmode = false
		} else {
			html = quill.getHTML()
			html = html === '<p><br></p>' ? '' : html
			htmlmode = true
		}
	}
</script>

<style lang="scss">
	.quill-component {
		margin: 0 0 20rem;
	}
	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0 0 4rem;
	}
	.button {
		margin: 0;
	}
	h2 {
		margin: 0;
		font: $bold 14rem $font;
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
</style>
