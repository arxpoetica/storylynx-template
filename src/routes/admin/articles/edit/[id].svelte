<h1>New News Article</h1>

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
		margin: 0 0 2rem;
		font: $bold 1.4rem $font;
	}
	em {
		font-weight: $normal;
	}
	input[type="text"] {
		margin: 0.4rem 0 0;
		padding: 0 1.2rem;
		height: 5rem;
		font: 1.6rem/1 $font;
	}
</style>
