<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->


<div class="admin-header">
	<h1>Post</h1>
	<div class="buttons">
		<a href="/admin/assets/new" class="button success">
			Create Post
		</a>
	</div>
</div>
<div class="admin-full">
	<!-- <ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/> -->
	<div class="list">
		<!-- <List bind:checkedItems {items} {cols}/> -->
	</div>
	<!-- <ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/> -->
</div>

<!-- <script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }, session) {
		const noPage = typeof query.page === 'undefined'
		if (noPage || !query.column || !query.sort) {
			let url = `/admin/assets?page=${noPage ? 1 : query.page}`
			url += `&column=${query.column ? query.column : 'published'}`
			url += `&sort=${query.sort ? query.sort : 'desc'}`
			return this.redirect(302, url)
		}
		query.page = query.page || 1
		const { page_size, items, items_count, drafts_count, published_count, archived_count } = await POST(
			'/api/admin/assets/page.json',
			Object.assign({ cookie: session.cookie }, query),
		)
		return { page_size, items, items_count, drafts_count, published_count, archived_count }
	}
</script> -->

<script>
	// import { stores } from '@sapper/app'
	// const { page: pageStore } = stores()
	// import List from '../_components/lists/List.svelte'
	// // import ToolBar from './_tools/ToolBar.svelte'

	// let cols = [
	// 	{ type: 'asset', col: 'assets', title: 'Assets' },
	// 	{ type: 'url', col: 'title', title: 'Title', url: '/admin/assets/', slug: 'id', sort: true },
	// 	{ type: 'function', col: item => item.assets ? item.assets.length : 0, title: 'Asset Count' },
	// 	{ type: 'array', col: 'tags', title: 'Tags', mapper: 'tag' },
	// 	{ type: 'datetime', col: 'published', title: 'Date', sort: true },
	// ]

	// export let page_size = 0
	// export let items = []
	// export let items_count = 0
	// export let drafts_count = 0
	// export let published_count = 0
	// export let archived_count = 0
	// let checkedItems = []
	// $: page = parseInt($pageStore.query.page)

	// async function trashItems() {
	// 	if (window.confirm('Are you sure you want to move these items to the trash?')) {
	// 		const ids = checkedItems
	// 			.map((item, index) => item ? items[index].id : false)
	// 			.filter(id => id)
	// 		const answer = await POST(`/api/admin/assets/archive.json`, { ids })
	// 		if (answer.error) {
	// 			return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
	// 		} else {
	// 			items = items.filter(item => !ids.find(id => id === item.id))
	// 			items_count -= answer.count
	// 			checkedItems = []
	// 			// if (!items.length && ) {} ... TODO: goto prior page?
	// 		}
	// 	}
	// }
</script>

<style type="text/scss">
	.list {
		margin: 0 0 20rem;
	}
</style>
