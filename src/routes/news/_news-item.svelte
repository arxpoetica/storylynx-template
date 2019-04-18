<!-- <p>{JSON.stringify(item)}</p> -->

<div class="news-item">
	{#if item.cover}
		<LazyImg src={item.cover.url} alt={item.cover.attribution}/>
	{:else}
		<LazyImg src="https://wearehubgames-website.s3.amazonaws.com/hero/upload/775/logo-blank-big.svg" alt="blank"/>
	{/if}
	<h2>{item.title}</h2>
	<h3>Posted {formattedDate} at {formattedTime}</h3>
	{#if item.summary}
		<p>{item.summary}</p>
	{/if}
	<!-- {#if item.content && item.content.text}
		<p>{item.content.text}</p>
	{/if} -->
	<!-- <a href="/archive/{item.id}" rel=prefetch>Explore</a> -->
	<h4>Tags:</h4>
	<div class="tags">
		{#each tags as tag, index}
			<strong>{tag}</strong>
		{/each}
	</div>
</div>

<!-- {
	"id": "cjulw3475qrw90946wrvtbagv",
	"tags": [{
		"tag": "awards"
	}]
} -->


<script>
	import dayjs from 'dayjs'
	import LazyImg from '../../components/shared/LazyImg.svelte'
	export let item

	// 2 seconds ago
	// 20 seconds ago
	// 34 seconds ago
	// 1 minute ago
	// 55 minutes ago
	// 2 hours ago
	// 23 hours ago
	// 1 day ago
	// 2 days ago
	// 3 days ago
	// 7 days ago
	// March 19
	$: parsed = dayjs(item.createdAt)
	$: formattedDate = parsed.format('MMMM DD, YYYY')
	$: formattedTime = parsed.format('h:mm a')

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
