<div class="admin">
	<!-- <div class="admin-header"></div> -->
	<slot></slot>
	<!-- <div class="admin-section">
	</div>
	<div class="admin-side">
		<slot name="side">yup it workddd</slot>
	</div> -->
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
		display: flex;
		flex-wrap: wrap;
		& :global(.admin-header) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-basis: 100%;
			padding: 20rem;
			border-bottom: 1px solid $gray-6;
			:global(h1) {
				margin: 0;
				font: $bold 18rem/1.2 $font;
			}
		}
		& :global(.admin-main) {
			flex: 1;
			padding: 20rem;
		}
		& :global(.admin-side) {
			flex-basis: 300rem;
			border-left: 1px solid $gray-6;
		}
	}
</style>
