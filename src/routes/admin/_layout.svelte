<slot></slot>
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

<!-- <style type="text/scss"></style> -->
