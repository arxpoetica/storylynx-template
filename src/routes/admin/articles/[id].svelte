{#if articleCopy}
	<div class="admin-header">
		<h1>{$page.params.id === 'new' ? 'Create' : 'Edit'} Article</h1>
		<div class="buttons">
			{#if $page.params.id === 'new'}
				<button class="button warning" {disabled} on:click={() => save('DRAFT')}>Save as Draft</button>
				<button class="button success" {disabled} on:click={() => save('PUBLISHED')}>Publish</button>
			{:else}
				{#if !disabled}
					<button class="button blank" on:click={() => discard()}>
						Discard Changes
					</button>
				{/if}
				{#if articleCopy.status === 'PUBLISHED'}
					<button class="button warning" on:click={() => save('DRAFT')}>
						Switch to Draft
					</button>
				{/if}
				<button class="button success" {disabled} on:click={() => save('PUBLISHED')}>
					{article.status === 'PUBLISHED' ? 'Update' : 'Publish'}
				</button>
			{/if}
		</div>
	</div>
	<div class="admin-main">
		<div class="frame">
			<Errors {errors}/>
			<label>
				Title
				<em> - (Required.)</em>
				<input bind:value={articleCopy.title} type="text" required>
			</label>
			<Quill title="Content" bind:html={articleCopy.html}/>
			<label>
				Summary
				<input bind:value={articleCopy.summary} type="text">
			</label>
		</div>
	</div>
	<div class="admin-side">
		<div class="accordion">
			<DetailsPanel bind:status={articleCopy.status} bind:datetime={articleCopy.publishedDatetime}/>
			<PermalinkPanel bind:slug={articleCopy.slug} title={articleCopy.title}/>
			<MediaPanel bind:articleCopy/>
			<TagsPanel bind:tags bind:articleCopy/>
		</div>
	</div>
{/if}

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }, session) {
		if (params.id === 'new') {
			const { tags } = await POST('/admin/api/tags/all.json', { cookie: session.cookie })
			return { article: {
				status: '',
				publishedDatetime: (new Date()).toISOString(),
				title: '',
				slug: '',
				html: '',
				summary: '',
				assets: [],
				tags: [],
			}, tags, bounce: true }
		}
		const { article, tags } = await POST('/admin/api/articles/single.json', {
			id: params.id,
			cookie: session.cookie,
		})
		return { article, tags, bounce: true }
	}
</script>

<script>
	import { beforeUpdate } from 'svelte'
	import { stores, goto } from '@sapper/app'
	const { page } = stores()
	import { hyphenate } from '@johnny/utils/basic-utils'
	import Errors from '../_components/Errors.svelte'
	import Quill from '../_components/Quill.svelte'
	import Panel from '../_components/panels/Panel.svelte'
	import DetailsPanel from '../_components/panels/DetailsPanel.svelte'
	import PermalinkPanel from '../_components/panels/PermalinkPanel.svelte'
	import MediaPanel from '../_components/panels/MediaPanel.svelte'
	import TagsPanel from '../_components/panels/TagsPanel.svelte'

	export let article
	export let tags
	export let bounce

	let articleCopy
	beforeUpdate(() => {
		if (bounce) {
			// see: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
			articleCopy = JSON.parse(JSON.stringify(article))
			bounce = false
		}
	})

	// see: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
	$: disabled = articleCopy ? JSON.stringify(article) === JSON.stringify(articleCopy) : true

	let errors = []
	async function save(status) {
		if (!disabled || status === 'DRAFT') {
			errors = []
			if (!articleCopy.title) { return errors = ['Please include a title.'] }

			if (status) {
				articleCopy.status = status
			}
			if (!articleCopy.slug) {
				articleCopy.slug = hyphenate(articleCopy.title).toLowerCase()
			}
			const changes = {}
			for (let key in articleCopy) {
				if (JSON.stringify(articleCopy[key]) !== JSON.stringify(article[key])) {
					changes[key] = articleCopy[key]
				}
			}

			const data = { changes }
			const isNew = $page.params.id === 'new'
			if (!isNew) { data.id = article.id }
			const savedArticle = await POST(`/admin/api/articles/${isNew ? 'create' : 'update'}.json`, data)

			if (savedArticle.error) {
				return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			} else if (isNew) {
				goto(`/admin/articles/${savedArticle.id}`, { replaceState: true })
			} else {
				article = savedArticle
				articleCopy = JSON.parse(JSON.stringify(article))
				// disabled = true
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
	.frame {
		max-width: 800rem;
		margin: 0 auto;
	}
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
