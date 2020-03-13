<Panel title="Tags" type="tags">
	<FormTags bind:tags bind:copy/>
</Panel>

<script>
	import Panel from './Panel.svelte'
	import FormTags from '../FormTags.svelte'
	export let tags
	export let copy
</script>

<!-- <style type="text/scss"></style> -->
