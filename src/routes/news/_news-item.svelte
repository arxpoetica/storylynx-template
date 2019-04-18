<!-- <p>{JSON.stringify(item)}</p> -->

<!-- <a class="news-item" href="/news/{item.id}" rel=prefetch> -->
<a class="news-item" href="/news/{item.id}">
	{#if item.cover}
		<LazyImg src={item.cover.url} alt={item.cover.attribution}/>
	{:else}
		<LazyImg src="https://wearehubgames-website.s3.amazonaws.com/hero/upload/775/logo-blank-big.svg" alt="blank"/>
	{/if}
	<h2>{item.title}</h2>
	<h3>{formattedstamp(item.createdAt)}</h3>
	<p>{summary}</p>
	<!-- <a href="/archive/{item.id}" rel=prefetch>Explore</a> -->
	<h4>Tags:</h4>
	<div class="tags">
		{#each tags as tag, index}
			<strong>{tag}</strong>
		{/each}
	</div>
</a>

<script>
	import { formattedstamp } from '../../_server/utils/basic-utils'
	import LazyImg from '../../components/shared/LazyImg.svelte'
	export let item

	let summary = ''
	$: if (item.summary) {
		summary = item.summary
	} else if (item.content.text) {
		const text = item.content.text
		summary = text.length > 100 ? text.slice(0, 99).trim() + '...' : text
	} else {
		summary = 'No summary.'
	}

	$: tags = item.tags.map(tag => tag.tag)
</script>

<style type="text/scss">
	.news-item {
		flex: 1;
		max-width: 40rem;
		min-width: 30rem;
		margin: 0 0.6rem 1.2rem;
		padding: 1.2rem 2rem;
		background-color: $gray-7;
		box-shadow: 0 0 2px $gray-5;
	}
	h4 {
		margin: 0 0 0.4rem;
	}
	.tags {
		display: flex;
		strong {
			margin-right: 0.4rem;
			padding: 0 0.4rem;
			background-color: $gray-6;
			border: 1px solid $gray-4;
			cursor: pointer;
		}
	}
</style>
