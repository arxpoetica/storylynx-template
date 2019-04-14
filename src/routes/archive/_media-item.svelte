<div class="media-item">
	<!-- <h1>{item.type}</h1> -->
	<LazyImg src={item.src}/>
	<h2>{item.title}</h2>
	<p>{item.summary}</p>
	<a href="/archive/{item.id}" rel=prefetch>Explore</a>
</div>

<script>
	import LazyImg from '../../components/shared/LazyImg.svelte'
	export let item
</script>

<style type="text/scss">
	.media-item {
		flex: 1;
		max-width: 30rem;
		min-width: 20rem;
		margin: 0 0.6rem 1.2rem;
		padding: 1.2rem 2rem;
		background-color: $gray-7;
		box-shadow: 0 0 2px $gray-5;
	}
</style>
