<svelte:head><title>Johnny Miller - Home</title></svelte:head>

<div class="content">
	<h1>Johnny Miller</h1>
	<h2>His personal website.</h2>
	<img src="/img/johnny-miller.jpg" alt="Johnny Miller wins an award.">
	<div>
		{#if $session.user}
			{$session.user.username} | {$session.user.role}
		{:else}
			{JSON.stringify($session)}
		{/if}
	</div>
</div>

<script>
	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<!-- <style type="text/scss"></style> -->
