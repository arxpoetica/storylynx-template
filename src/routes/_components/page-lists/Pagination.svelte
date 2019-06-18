<div class="info">Page {page} of {itemsCount}</div>
<nav>
	{#if page > 1}
		<a href="/news?{createQuery(page - 1)}" class="prev">Previous</a>
	{/if}
	<div class="pages">
		{#each range as rangeNumber}
			{#if rangeNumber === page}
				<span class="current">{rangeNumber}</span>
			{:else if rangeNumber === '...'}
				<span class="etc">{rangeNumber}</span>
			{:else}
				<a href="/news?{createQuery(rangeNumber)}">{rangeNumber}</a>
			{/if}
		{/each}
	</div>
	{#if page < pagesCount}
		<a href="/news?{createQuery(page + 1)}" class="next">Next</a>
	{/if}
</nav>

<script>
	import { createPaginationRange, createQuery } from './page-helpers'

	export let page
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
		margin: 0 0 1rem;
	}
	nav {
		display: flex;
		align-items: center;
	}
	.pages {
		display: flex;
		line-height: 1;
		a,
		span {
			// display: block;
			margin: 0 2rem 0 0;
			padding: 1rem;
			user-select: none;
		}
		a {
			background-color: $yellow-l4;
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
	// .prev,
	// .next {
	// }
	.prev {
		margin: 0 2rem 0 0;
	}
	// .next {}
</style>
