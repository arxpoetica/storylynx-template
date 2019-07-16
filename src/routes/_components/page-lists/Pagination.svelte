<div class="info">Page {page} of {itemsCount}</div>
<nav>
	{#if page > 1}
		{#if href}
			<a href="{href}?{createQuery(page - 1)}" class="prev">Previous</a>
		{:else}
			<button on:click={() => page -= 1} class="prev">Previous</button>
		{/if}
	{/if}
	<div class="pages">
		{#each range as rangeNumber}
			{#if rangeNumber === page}
				<span class="current">{rangeNumber}</span>
			{:else if rangeNumber === '...'}
				<span class="etc">{rangeNumber}</span>
			{:else}
				{#if href}
					<a href="{href}?{createQuery(rangeNumber)}">{rangeNumber}</a>
				{:else}
					<button on:click={() => page = rangeNumber}>{rangeNumber}</button>
				{/if}
			{/if}
		{/each}
	</div>
	{#if page < pagesCount}
		{#if href}
			<a href="{href}?{createQuery(page + 1)}" class="next">Next</a>
		{:else}
			<button on:click={() => page += 1} class="next">Next</button>
		{/if}
	{/if}
</nav>

<script>
	import { createPaginationRange, createQuery } from './page-helpers'

	export let href = ''
	export let page = 1
	export let pageSize
	export let items
	export let itemsCount

	// REMINDER: what is a page in this context?
	// ANSWER: it's a navigational number (1, 2, 3) representing the page to turn to
	// ALSO: `page` is the current number
	$: pagesCount = Math.ceil(itemsCount / pageSize)
	$: range = createPaginationRange(page, pagesCount)
</script>

<style type="text/scss">
	.info {
		margin: 0 0 10rem;
	}
	nav {
		display: flex;
		align-items: center;
	}
	.pages {
		display: flex;
		line-height: 1;
		a,
		span,
		button {
			margin: 0 20rem 0 0;
			padding: 10rem;
			border: 0;
			user-select: none;
		}
		a,
		button {
			background-color: $yellow-l4;
			outline: 0;
			cursor: pointer;
		}
		.current {
			background-color: $green-main;
			color: white;
			cursor: default;
		}
		.etc {
			background-color: $gray-7;
			cursor: default;
		}
	}
	.prev,
	.next {
		padding: 0;
		border: 0;
		color: $links;
		outline: 0;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	.prev {
		margin: 0 20rem 0 0;
	}
	// .next {}
</style>
