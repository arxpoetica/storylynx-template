<Panel title="Permalink" type="permalink">
	<label>
		<em>(Must be unique. If empty, url will derive from post title.)</em>
		<input on:blur={setSlug} bind:value={slug} type="text"/>
	</label>
	<ul>
		<li>
			<strong>Preview:</strong>
			<a href={url} target="_blank">{url}</a>
		</li>
	</ul>
</Panel>

<script>
	import { hyphenate } from '@johnny/utils/basic-utils'
	import Panel from './Panel.svelte'
	export let slug = ''
	export let path = ''
	export let title = ''
	$: url = process.env.JM_HOST + path + slug
	function setSlug() {
		if (!slug) {
			slug = hyphenate(title).toLowerCase()
		}
	}
</script>

<!-- <style type="text/scss"></style> -->
