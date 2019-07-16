<Panel title="Tags" type="tags">
	<FormTags bind:tags bind:articleCopy/>
</Panel>

<script>
	import Panel from './Panel.svelte'
	import FormTags from '../FormTags.svelte'
	export let tags
	export let articleCopy
</script>

<!-- <style type="text/scss"></style> -->
