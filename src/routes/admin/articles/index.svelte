<div class="admin-header">
	<h1>Article</h1>
	<div class="buttons">
		<a href="/admin/articles/new" class="button success">
			Create Article
		</a>
	</div>
</div>
<div class="admin-full">
	<List {items}/>
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ query }, session) {
		// if (typeof query.page === 'undefined') {
		// 	return this.redirect(302, 'news?page=1')
		// }
		query.page = query.page || 1
		query.pageSize = 50
		const { pageSize, items, itemsCount } = await POST(
			'/admin/api/articles/page.json',
			Object.assign({ cookie: session.cookie }, query),
		)
		return { pageSize, items, itemsCount }
	}
</script>

<script>
	import List from './_list/List.svelte'
	// import Pagination from '../_components/page-lists/Pagination.svelte'
	// import { stores } from '@sapper/app'
	// const { page: pageStore } = stores()

	// export let segment
	export let pageSize = 0
	export let items = []
	export let itemsCount = 0
	// $: page = parseInt($pageStore.query.page)
</script>

<!-- <style type="text/scss"></style> -->
