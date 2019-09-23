<div class="pagination">
	<div class="info">{itemsCount} items</div>
	<nav>
		{#if href}
			<a href="{href}?{createQuery(page - 1, query)}" class="prev-next" class:on={page > 1}>
				<div class="prev-next">Prev</div>
			</a>
		{:else}
			<button on:click={() => page -= 1} class="prev-next" class:on={page > 1}>
				<div class="prev-next">Prev</div>
			</button>
		{/if}
		<div class="pages">
			{#each range as rangeNumber}
				{#if rangeNumber === page}
					<span class="current">{rangeNumber}</span>
				{:else if rangeNumber === '...'}
					<span class="etc">{rangeNumber}</span>
				{:else}
					{#if href}
						<a href="{href}?{createQuery(rangeNumber, query)}">{rangeNumber}</a>
					{:else}
						<button on:click={() => page = rangeNumber}>{rangeNumber}</button>
					{/if}
				{/if}
			{/each}
		</div>
		{#if href}
			<a href="{href}?{createQuery(page + 1, query)}" class="prev-next" class:on={page < pagesCount}>
				<div class="prev-next">Next</div>
				<!-- <div class="svg"><Next/></div> -->
			</a>
		{:else}
			<button on:click={() => page += 1} class="prev-next" class:on={page < pagesCount}>
				<div class="prev-next">Next</div>
				<!-- <div class="svg"><Next/></div> -->
			</button>
		{/if}
	</nav>
</div>

<script>
	import { stores } from '@sapper/app'
	const { page: pageStore } = stores()
	import { createPaginationRange, createQuery } from '@johnny/utils/page-helpers'

	import Prev from '@johnny/svg/prev.svelte'
	import Next from '@johnny/svg/next.svelte'

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
	$: query = $pageStore.query
</script>

<style type="text/scss">
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rem;
	}
	.info {
		margin: 0 10rem 0 0;
	}
	nav {
		display: flex;
		align-items: center;
		// margin: 0 -2rem;
		// padding: 0 2rem;
		line-height: 1;
	}
	.pages {
		display: flex;
	}
	a,
	span,
	button {
		margin: 0 2rem;
		padding: 6rem 10rem;
		border: 0;
		user-select: none;
		background-color: transparent;
		color: $black;
		border: 1rem solid #f0f4f5;
		&:hover {
			border: 1rem solid $black;
		}	
	}
	a,
	button {
		background-color: transparent;
		outline: 0;
		cursor: pointer;
	}
	.current {
		background-color: transparent;
		color: $black;
		cursor: default;
	}
	.etc {
		background-color: transparent;
		color: $black;
		cursor: default;
		border: none;
	}
	.svg {
		width: 8rem;
	}
	.prev-next {
		background-color: transparent;
		color: $black;
		pointer-events: none;
		border: none;
		&.on {
			background-color: transparent;
			pointer-events: all;
		}
		&:hover {
			border: none;
		}	
	}
</style>
