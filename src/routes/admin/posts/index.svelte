<!-- <div class="admin-header">
	<h1>Article</h1>
	<div class="buttons">
		<a href="/admin/articles/new" class="button success">
			Create Article
		</a>
	</div>
</div>
<div class="admin-full">
	<ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/>
	<div class="list">
		<List bind:checkedItems {items} {cols}/>
	</div>
	<ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/>
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }, session) {
		const noPage = typeof query.page === 'undefined'
		if (noPage || !query.column || !query.sort) {
			let url = `/admin/articles?page=${noPage ? 1 : query.page}`
			url += `&column=${query.column ? query.column : 'publishedDatetime'}`
			url += `&sort=${query.sort ? query.sort : 'desc'}`
			return this.redirect(302, url)
		}
		query.page = query.page || 1
		const { pageSize, items, itemsCount, draftsCount, publishedCount, archivedCount } = await POST(
			'/api/admin/articles/page.json',
			Object.assign({ cookie: session.cookie }, query),
		)
		return { pageSize, items, itemsCount, draftsCount, publishedCount, archivedCount }
	}
</script>

<script>
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()
	import List from '../_components/lists/List.svelte'
	import ToolBar from './_tools/ToolBar.svelte'

	let cols = [
		{ type: 'asset', col: 'assets', title: 'Cover' },
		{ type: 'url', col: 'title', title: 'Title', url: '/admin/articles/', slug: 'id', sort: true },
		{ type: 'array', col: 'tags', title: 'Tags', mapper: 'tag' },
		{ type: 'datetime', col: 'publishedDatetime', title: 'Date', sort: true },
	]

	export let pageSize = 0
	export let items = []
	export let itemsCount = 0
	export let draftsCount = 0
	export let publishedCount = 0
	export let archivedCount = 0
	let checkedItems = []
	$: page = parseInt($pageStore.query.page)

	async function trashItems() {
		if (window.confirm('Are you sure you want to move these items to the trash?')) {
			const ids = checkedItems
				.map((item, index) => item ? items[index].id : false)
				.filter(id => id)
			const answer = await POST(`/api/admin/articles/archive.json`, { ids })
			if (answer.error) {
				return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			} else {
				items = items.filter(item => !ids.find(id => id === item.id))
				itemsCount -= answer.count
				checkedItems = []
				// if (!items.length && ) {} ... TODO: goto prior page?
			}
		}
	}
</script>

<style type="text/scss">
	.list {
		margin: 0 0 20rem;
	}
</style> -->
