<Panel title="Permalink" type="permalink">
	<label>
		<em>(Must be unique. If empty, url will derive from article title.)</em>
		<input on:blur={setSlug} bind:value={slug} type="text"/>
	</label>
	<ul>
		<li>
			<strong>Preview:</strong>
			<a href="{process.env.JM_HOST}/news/{slug}" target="_blank">
				{process.env.JM_HOST}/news/{slug}
			</a>
		</li>
	</ul>
</Panel>

<script>
	import { hyphenate } from '@johnny/utils/basic-utils'
	import Panel from './Panel.svelte'
	export let slug
	export let title
	function setSlug() {
		if (!slug) {
			slug = hyphenate(title).toLowerCase()
		}
	}
</script>

<!-- <style type="text/scss"></style> -->
