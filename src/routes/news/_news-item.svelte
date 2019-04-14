<!-- <p>{JSON.stringify(item)}</p> -->

<div class="news-item">
	<!-- <LazyImg src={item.src}/> -->
	<h2>{item.title}</h2>
	<h3>Posted {formattedDate} at {formattedTime}</h3>
	{#if item.summary}
		<p>{item.summary}</p>
	{/if}
	<a href="/archive/{item.id}" rel=prefetch>Explore</a>
</div>

<!-- title: "ten 10", -->
<!-- content: "excepteur sint tempor adipisicing mollit dolor cupidatat adipisicing ad in enim sunt voluptate irure eiusmod amet deserunt pariatur magna amet ullamco enim velit officia enim incididunt excepteur anim consectetur duis mollit pariatur", -->
<!-- summary: "", -->
<!-- published: true, -->
<!-- _id: "5c9c4b202d0fb50c30cde46a", -->
<!-- createdAt: "2019-03-28T04:18:40.063Z", -->
<!-- updatedAt: "2019-03-28T04:18:40.067Z", -->
<!-- __v: 0, -->
<!-- id: "5c9c4b202d0fb50c30cde46a", -->
<!-- cover: null -->

<script>
	import dayjs from 'dayjs'
	// import LazyImg from '../../components/shared/LazyImg.svelte'
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
</style>
