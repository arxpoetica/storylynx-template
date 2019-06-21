<svelte:head><title>Johnny Miller - Tournaments</title></svelte:head>

<h1>Tournaments</h1>

{#if tournaments.length}
	<div class="tournaments">
		{#each tournaments as tournament}
			<div class="tournament">
				<h2>Name: {tournament.tournament_name}</h2>
				<h3>Tour: {tournament.tour}</h3>
			</div>
		{/each}
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	import { GET } from '../server/utils/loaders'
	export async function preload({ query }) {
		const { tournaments } = await GET('/api/articles/page.json')
		return { tournaments }
	}
</script>

<script>
	export let tournaments = []
</script>

<style type="text/scss">
	.tournament {
		padding: 2rem;
		margin: 0 0 2rem;
		background-color: $gray-6;
		box-shadow: 0 0 2px $gray-4;
	}
</style>
