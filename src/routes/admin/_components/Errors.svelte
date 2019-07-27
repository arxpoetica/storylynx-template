{#if errors.length}
	<ul class="errors">
		{#each errors as error}
			<li class="error">{error}</li>
		{/each}
	</ul>
{/if}

<script>
	export let errors = []
</script>

<style type="text/scss">
	.errors {
		margin: 0 0 20rem;
		padding: 20rem 20rem 20rem 40rem;
		background-color: $red-l5;
		border: 1rem solid $red-main;
		color: $red-dark;
		font-weight: $bold;
	}
	// .error {}
</style>
