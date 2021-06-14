<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<SinglePostLayout {post} {tags}/>

<script context="module">
	import { loader } from 'storylynx/svelte/admin/posts/SinglePostLayout.load.js'
	export const load = loader
</script>

<script>
	import SinglePostLayout from 'storylynx/svelte/admin/posts/SinglePostLayout.svelte'
	export let post
	export let tags
</script>









<!-- {#if copy}
	<div class="admin-header">
		<h1>{$page.params.id === 'new' ? 'Create' : 'Edit'} Post</h1>
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
					{post.status === 'PUBLISHED' ? 'Update' : 'Publish'}
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
			<DetailsPanel bind:status={copy.status} bind:datetime={copy.published}/>
			<PermalinkPanel bind:slug={copy.slug} path="/news/" title={copy.title}/>
			<MediaPanel bind:copy/>
			<TagsPanel bind:tags bind:copy/>
		</div>
	</div>
{/if}

<script context="module">
	import { GET, POST } from '@johnny/utils/loaders'
	export async function load({ params }, session) {
		if (params.id === 'new') {
			const { tags } = await GET('/api/public/tags/post-all.json')
			return { post: {
				status: '',
				published: (new Date()).toISOString(),
				title: '',
				slug: '',
				html: '',
				summary: '',
				assets: [],
				tags: [],
			}, tags, bounce: true }
		}
		const { post, tags } = await POST('/api/admin/posts/single.json', {
			id: params.id,
			cookie: session.cookie,
		})
		return { post, tags, bounce: true }
	}
</script>

<script>
	import { beforeUpdate } from 'svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { hyphenate } from '@johnny/utils/basic-utils'
	import Errors from '../_components/Errors.svelte'
	import Quill from '../_components/Quill.svelte'
	import Panel from '../_components/panels/Panel.svelte'
	import DetailsPanel from '../_components/panels/DetailsPanel.svelte'
	import PermalinkPanel from '../_components/panels/PermalinkPanel.svelte'
	import MediaPanel from '../_components/panels/MediaPanel.svelte'
	import TagsPanel from '../_components/panels/TagsPanel.svelte'

	export let post
	export let tags
	export let bounce

	let copy
	beforeUpdate(() => {
		if (bounce) {
			// see: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
			copy = JSON.parse(JSON.stringify(post))
			bounce = false
		}
	})

	// see: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
	$: disabled = copy ? JSON.stringify(post) === JSON.stringify(copy) : true

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
				if (JSON.stringify(copy[key]) !== JSON.stringify(post[key])) {
					changes[key] = copy[key]
				}
			}

			const data = { changes }
			const isNew = $page.params.id === 'new'
			if (!isNew) { data.id = post.id }
			const savedPost = await POST(`/api/admin/posts/${isNew ? 'create' : 'update'}.json`, data)

			if (savedPost.error) {
				return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			} else if (isNew) {
				goto(`/admin/posts/${savedPost.id}`, { replaceState: true })
			} else {
				post = savedPost
				copy = JSON.parse(JSON.stringify(post))
				// disabled = true
			}
		}
	}
	function discard() {
		if (window.confirm('Discard all changes? Careful: This is permanent and cannot be reversed.')) {
			copy = false // unfortunate rejiggering
			setTimeout(() => {
				copy = JSON.parse(JSON.stringify(post))
				disabled = true
			}, 0)
		}
	}
</script>

<style lang="scss">
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
</style> -->
