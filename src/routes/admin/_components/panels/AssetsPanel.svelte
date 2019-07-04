<Panel title="Assets" type="assets">
	<img src={articleCopy.cover.url} alt={articleCopy.cover.summary || 'No alt information.'}/>
</Panel>

<script>
	import Panel from './Panel.svelte'
	export let articleCopy
</script>

<!-- <style type="text/scss"></style> -->
