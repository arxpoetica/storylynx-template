<h1>Edit News Article</h1>

<!-- {console.log(article)} -->
<!-- {console.log(tags)} -->

{#if articleCopy}
	<form on:submit={event => submit(event)}>
		<label>
			Title
			<em> - (Required.)</em>
			<input bind:value={articleCopy.title} type="text" required>
		</label>
		<label>
			Slug
			<em> - (Must be unique. If empty, article url will derive from title.)</em>
			<input bind:value={articleCopy.slug} type="text">
		</label>
		<!-- <label>
			Published Date and Time
			<input bind:value={articleCopy.datetime} type="text" required>
		</label> -->

		<Quill title="Content" bind:html={articleCopy.content.html}/>

		<label>
			Summary
			<input bind:value={articleCopy.summary} type="text">
		</label>
		<!-- <label>
			Cover
			<input bind:value={articleCopy.cover} type="text" required>
		</label> -->
		<!-- <label>
			Tags
			<input bind:value={articleCopy.tags} type="text" required>
		</label> -->

		<FormTags bind:tags bind:articleCopy/>

		<button class="button warning" type="submit" {disabled}>Save</button>
	</form>
{/if}

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }, session) {
		const { article, tags } = await POST('/admin/api/articles/single.json', {
			id: params.id,
			cookie: session.cookie,
		})
		return { article, tags }
	}
</script>

<script>
	import { onMount } from 'svelte'
	import Quill from '../../_components/Quill.svelte'
	import FormTags from '../../_components/FormTags.svelte'
	export let article
	export let tags

	// see: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
	let articleCopy
	onMount(() => articleCopy = JSON.parse(JSON.stringify(article)))

	let disabled = true
	$: if (articleCopy) {
		// see: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
		disabled = JSON.stringify(article) === JSON.stringify(articleCopy)
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
