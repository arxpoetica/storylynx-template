<h1>Edit News Article</h1>

<label>
	Title
	<input bind:value={title} type="text" required="required">
</label>
<label>
	Slug
	<em> - (Optional)</em>
	<input bind:value={slug} type="text" required="required">
</label>
<label>
	Published Date and Time
	<input bind:value={datetime} type="text" required="required">
</label>

<Quill title="Content"/>

<label>
	Summary
	<input bind:value={summary} type="text" required="required">
</label>
<!-- <label>
	Cover
	<input bind:value={cover} type="text" required="required">
</label> -->
<label>
	Tags
	<input bind:value={tags} type="text" required="required">
</label>

<script>
	import Quill from '../../_components/Quill.svelte'

	let title = ''
	let slug = ''
	let datetime = ''
	let summary = ''
	let cover = ''
	let tags = ''

	let start = new Date()
	let end = new Date()
</script>

<style type="text/scss">
	label {
		margin: 0 0 20rem;
		font: $bold 14rem $font;
	}
	em {
		font-weight: $normal;
	}
	input[type="text"] {
		margin: 4rem 0 0;
		padding: 0 12rem;
		height: 50rem;
		font: 16rem/1 $font;
	}
</style>
