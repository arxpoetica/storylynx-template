<MainLayout>
	<slot></slot>
</MainLayout>

<script>
	import { setContext } from 'svelte'
	import { stores } from '@sapper/app'
	const { session, page, goto } = stores()
	setContext('@sapper/app', { get_sapper_stores: () => ({ session, page, goto }) })
	import MainLayout from 'storylynx/svelte/layout/MainLayout.svelte'
</script>
