<h1>Tournaments</h1>

{#if years.length}
	<div class="years">
		{#each years as year}
			<div class="year">
				<h2>{year.year}</h2>
				{#each year.data as tournament}
					<div class="tournament">
						<h2>Name: {tournament.tournament_name}</h2>
						<h3>Tour: {tournament.tour}</h3>
						<p>date: {tournament.date}</p>
						<p>finish: {tournament.finish}</p>
						<p>score_round1: {tournament.score_round1}</p>
						<p>score_round2: {tournament.score_round2}</p>
						<p>score_round3: {tournament.score_round3}</p>
						<p>score_round4: {tournament.score_round4}</p>
						<p>position_round1: {tournament.position_round1}</p>
						<p>position_round2: {tournament.position_round2}</p>
						<p>position_round3: {tournament.position_round3}</p>
						<p>total_score: {tournament.total_score}</p>
						<p>to_par: {tournament.to_par}</p>
						<p>earnings: {tournament.earnings}</p>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{:else}
	<h2>Loading . . .</h2>
{/if}

<script context="module">
	import { GET } from '../../server/utils/loaders'
	export async function preload({ query }) {
		const { years } = await GET('/api/tournaments/all.json')
		return { years }
	}
</script>

<script>
	export let years = []
</script>

<style type="text/scss">
	.year {
		padding: 2rem;
		margin: 0 0 2rem;
		border: 0.2rem solid $yellow-l4;
	}
	.tournament {
		padding: 2rem;
		margin: 0 0 2rem;
		background-color: $gray-7;
		box-shadow: 0 0 2px $gray-5;
		&:last-child { margin: 0; }
	}
</style>
