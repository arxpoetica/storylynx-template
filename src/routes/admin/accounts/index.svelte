<div class="admin-header">
	<h1>Article</h1>
	<div class="buttons">
		<a href="/admin/articles/new" class="button success">
			Create New User
		</a>
	</div>
</div>
<div class="admin-full">
	<!-- <ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/> -->
	<div class="list">
		<List bind:checkedItems {items}/>
	</div>
	<!-- <ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/> -->
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload(page, session) {
		const { items, itemsCount } = await POST('/admin/api/accounts/page.json', {
			cookie: session.cookie
		})
		return { items, itemsCount }
	}
</script>

<script>
	import List from '../_components/lists/List.svelte'
	// import ToolBar from './_tools/ToolBar.svelte'

	// export let segment

	export let items = []
	export let itemsCount = 0

	let checkedItems = []

	async function trashItems() {
		if (window.confirm('Are you sure you want to move these items to the trash?')) {
			// const ids = checkedItems
			// 	.map((item, index) => item ? items[index].id : false)
			// 	.filter(id => id)
			// const answer = await POST(`/admin/api/articles/archive.json`, { ids })
			// if (answer.error) {
			// 	return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			// } else {
			// 	items = items.filter(item => !ids.find(id => id === item.id))
			// 	itemsCount -= answer.count
			// 	checkedItems = []
			// 	// if (!items.length && ) {} ... TODO: goto prior page?
			// }
		}
	}
</script>

<style type="text/scss">
	.list {
		margin: 0 0 20rem;
	}
</style>
