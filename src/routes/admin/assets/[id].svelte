{#if copy}
	<div class="admin-header">
		<h1>{$page.params.id === 'new' ? 'Create' : 'Edit'} Asset</h1>
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
				{#if copy.status === 'PUBLISHED'}
					<button class="button warning" on:click={() => save('DRAFT')}>
						Switch to Draft
					</button>
				{/if}
				<button class="button success" {disabled} on:click={() => save('PUBLISHED')}>
					{asset.status === 'PUBLISHED' ? 'Update' : 'Publish'}
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
				<input bind:value={copy.title} type="text" required>
			</label>
			<Quill title="Content" bind:html={copy.html}/>
			<label>
				Summary
				<input bind:value={copy.summary} type="text">
			</label>
		</div>
	</div>
	<div class="admin-side">
		<div class="accordion">
			<DetailsPanel bind:status={copy.status} bind:datetime={copy.publishedDatetime}/>
			<PermalinkPanel bind:slug={copy.slug} path="/asset/" title={copy.title}/>
			<MediaPanel bind:copy/>
			<TagsPanel bind:tags bind:copy/>
		</div>
	</div>
{/if}

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }, session) {
		if (params.id === 'new') {
			const { tags } = await POST('/admin/api/tags/asset-all.json', { cookie: session.cookie })
			return { asset: {
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
		const { asset, tags } = await POST('/admin/api/assets/single.json', {
			id: params.id,
			cookie: session.cookie,
		})
		return { asset, tags, bounce: true }
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

	export let asset
	export let tags
	export let bounce

	let copy
	beforeUpdate(() => {
		if (bounce) {
			// see: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
			copy = JSON.parse(JSON.stringify(asset))
			bounce = false
		}
	})

	// see: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
	$: disabled = copy ? JSON.stringify(asset) === JSON.stringify(copy) : true

	let errors = []
	async function save(status) {
		if (!disabled || status === 'DRAFT') {
			errors = []
			if (!copy.title) { return errors = ['Please include a title.'] }

			if (status) {
				copy.status = status
			}
			if (!copy.slug) {
				copy.slug = hyphenate(copy.title).toLowerCase()
			}
			const changes = {}
			for (let key in copy) {
				if (JSON.stringify(copy[key]) !== JSON.stringify(asset[key])) {
					changes[key] = copy[key]
				}
			}

			const data = { changes }
			const isNew = $page.params.id === 'new'
			if (!isNew) { data.id = asset.id }
			const savedAsset = await POST(`/admin/api/assets/${isNew ? 'create' : 'update'}.json`, data)

			if (savedAsset.error) {
				return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			} else if (isNew) {
				goto(`/admin/assets/${savedAsset.id}`, { replaceState: true })
			} else {
				asset = savedAsset
				copy = JSON.parse(JSON.stringify(asset))
				// disabled = true
			}
		}
	}
	function discard() {
		if (window.confirm('Discard all changes? Careful: This is permanent and cannot be reversed.')) {
			copy = false // unfortunate rejiggering
			setTimeout(() => {
				copy = JSON.parse(JSON.stringify(asset))
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
