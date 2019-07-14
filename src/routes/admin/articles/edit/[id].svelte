{#if articleCopy}
	<div class="admin-header">
		<h1>Edit News Article</h1>
		<div class="buttons">
			{#if !disabled}
				<button class="button blank" on:click={event => discard()}>
					Discard Changes
				</button>
			{/if}
			{#if articleCopy.status === 'PUBLISHED'}
				<button class="button warning" {disabled} on:click={event => save(event, 'DRAFT')}>
					Switch to Draft
				</button>
			{/if}
			<button class="button success" {disabled} on:click={event => save(event, 'PUBLISHED')}>
				{article.status === 'PUBLISHED' ? 'Update' : 'Publish'}
			</button>
		</div>
	</div>
	<div class="admin-main">
		<form on:submit={event => save(event)}>
			<label>
				Title
				<em> - (Required.)</em>
				<input bind:value={articleCopy.title} type="text" required>
			</label>
			<label>
				Summary
				<input bind:value={articleCopy.summary} type="text">
			</label>
			<Quill title="Content" bind:html={articleCopy.html}/>
		</form>
	</div>
	<div class="admin-side">
		<div class="accordion">
			<DetailsPanel bind:status={articleCopy.status} bind:datetime={articleCopy.publishedDatetime}/>
			<PermalinkPanel bind:slug={articleCopy.slug}/>
			<MediaPanel bind:articleCopy/>
			<TagsPanel bind:tags bind:articleCopy/>
		</div>
	</div>
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
	import Panel from '../../_components/panels/Panel.svelte'
	import DetailsPanel from '../../_components/panels/DetailsPanel.svelte'
	import PermalinkPanel from '../../_components/panels/PermalinkPanel.svelte'
	import MediaPanel from '../../_components/panels/MediaPanel.svelte'
	import TagsPanel from '../../_components/panels/TagsPanel.svelte'

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

	async function save(event, status) {
		event.preventDefault()
		if (!disabled) {
			if (status) {
				articleCopy.status = status
			}

			const changes = {
				status: articleCopy.status !== article.status ? articleCopy.status : null,
				title: articleCopy.title !== article.title ? articleCopy.title : null,
				slug: articleCopy.slug !== article.slug ? articleCopy.slug : null,
				// datetime: articleCopy.datetime,
				html: articleCopy.html !== article.html ? articleCopy.html : null,
				summary: articleCopy.summary !== article.summary ? articleCopy.summary : null,
				// assets: articleCopy.assets, // FIXME:
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
				articleCopy = JSON.parse(JSON.stringify(article))
				disabled = true
			}
		}
	}
	function discard() {
		if (window.confirm('Discard all changes? Careful: This is permanent and cannot be reversed.')) {
			articleCopy = false // unfortunate rejiggering
			setTimeout(() => {
				articleCopy = JSON.parse(JSON.stringify(article))
				disabled = true
			}, 0)
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
