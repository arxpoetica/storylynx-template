<h1>Edit News Article</h1>

{#if articleCopy}
	<form on:submit={event => submitForm(event)}>
		<label>
			Status
			<em> - (Required.)</em>
			<input bind:value={articleCopy.status} type="text" required>
		</label>
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
		<Quill title="Content" bind:html={articleCopy.html}/>
		<label>
			Summary
			<input bind:value={articleCopy.summary} type="text">
		</label>
		<!-- <label>
			Cover
			<input bind:value={articleCopy.cover} type="text" required>
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
	import { cleanObject } from '@johnny/utils/basic-utils'
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

	async function submitForm(event) {
		event.preventDefault()
		if (!disabled) {

			const changes = {
				status: articleCopy.status !== article.status ? articleCopy.status : null,
				title: articleCopy.title !== article.title ? articleCopy.title : null,
				slug: articleCopy.slug !== article.slug ? articleCopy.slug : null,
				// datetime: articleCopy.datetime,
				html: articleCopy.html !== article.html ? articleCopy.html : null,
				summary: articleCopy.summary !== article.summary ? articleCopy.summary : null,
				// cover: articleCopy.cover,
				tags: JSON.stringify(article.tags) !== JSON.stringify(articleCopy.tags) ? articleCopy.tags : null,
			}
			cleanObject(changes)

			const savedArticle = await POST('/admin/api/articles/update.json', {
				id: article.id,
				changes,
			})

			if (savedArticle.message) {
				console.log('FIXME:')
				// message = user.message
			} else {
				article = savedArticle
				disabled = true
			}
		}
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
