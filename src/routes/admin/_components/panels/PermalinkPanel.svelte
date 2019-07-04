<Panel title="Permalink" type="permalink">
	<label>
		<em>(Must be unique. If empty, url will derive from article title.)</em>
		<input bind:value={slug} type="text"/>
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
	import Panel from './Panel.svelte'
	export let slug
</script>

<!-- <style type="text/scss"></style> -->
