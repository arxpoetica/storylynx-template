<svelte:head><title>Johnny Miller - Home</title></svelte:head>

{#if $session.user}
	<Private/>
{:else}
	<Public/>
{/if}

<script>
	import { stores } from '@sapper/app'
	const { session } = stores()

	import Private from './_home-private.svelte'
	import Public from './_home-public.svelte'
</script>
