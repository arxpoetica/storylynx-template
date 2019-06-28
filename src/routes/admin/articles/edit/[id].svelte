<h1>Edit News Article</h1>

{console.log(article)}

{#if copy}
	<form on:submit={event => submit(event)}>
		<label>
			Title
			<input bind:value={copy.title} type="text" required>
		</label>
		<label>
			Slug
			<em> - (Optional)</em>
			<input bind:value={copy.slug} type="text">
		</label>
		<!-- <label>
			Published Date and Time
			<input bind:value={copy.datetime} type="text" required>
		</label> -->

		<Quill title="Content" html={copy.content.html}/>

		<label>
			Summary
			<input bind:value={copy.summary} type="text">
		</label>
		<!-- <label>
			Cover
			<input bind:value={copy.cover} type="text" required>
		</label> -->
		<!-- <label>
			Tags
			<input bind:value={copy.tags} type="text" required>
		</label> -->
		<button class="button warning" type="submit" {disabled}>Save</button>
	</form>
{/if}

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }, session) {
		const { article } = await POST('/admin/api/articles/single.json', {
			id: params.id,
			cookie: session.cookie,
		})
		return { article }
	}
</script>

<script>
	import { onMount } from 'svelte'
	import Quill from '../../_components/Quill.svelte'
	export let article

	// see: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
	let copy
	onMount(() => copy = JSON.parse(JSON.stringify(article)))

	let disabled = true
	$: if (copy) {
		// see: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
		disabled = JSON.stringify(article) === JSON.stringify(copy)
	}

	function submit(event) {
		event.preventDefault()
		console.log('SUBMIT THIS!')
	}
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
