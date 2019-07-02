<div class="admin">
	<slot></slot>
</div>
{@html `<${'style'}>${QuillCss}</${'style'}>`}

<script context="module">
	export function preload(page, session) {
		if (!session.user) { return this.redirect(302, '/') }
		return {}
	}
</script>

<script>
	import { beforeUpdate } from 'svelte'
	import { stores } from '@sapper/app'
	const { session } = stores()
	import { QuillCss } from './_components/QuillCss'

	import { Quill } from '@johnny/stores/admin-store'
	beforeUpdate(async() => {
		if (!$Quill) {
			const ImportedQuill = (await import('quill/dist/quill.js')).default
			ImportedQuill.prototype.setHTML = function(html) {
				this.root.innerHTML = html
			}
			ImportedQuill.prototype.getHTML = function() {
				return this.root.innerHTML
			}
			Quill.set(ImportedQuill)
		}
	})
</script>

<style type="text/scss">
	.admin {
		display: grid;
		grid-template-areas:
			"header header"
			"main side"
		;
		grid-template-rows: auto 1fr;
		grid-template-columns: 1fr 300rem;
		min-height: 100%;
		& :global(.admin-header) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			grid-row: header;
			grid-column: header;
			padding: 20rem;
			border-bottom: 1px solid $gray-6;
			:global(h1) {
				margin: 0;
				font: $bold 18rem/1.2 $font;
			}
		}
		& :global(.admin-all) {
			grid-row: header / main;
			grid-column: main / side;
			padding: 20rem;
		}
		& :global(.admin-full) {
			grid-row: main;
			grid-column: main / side;
			padding: 20rem;
		}
		& :global(.admin-main) {
			grid-row: main;
			grid-column: main;
			padding: 20rem;
		}
		& :global(.admin-side) {
			// grid-row: header / side;
			grid-row: side;
			grid-column: side;
			border-left: 1px solid $gray-6;
		}
	}
</style>
