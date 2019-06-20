<!-- <p>{JSON.stringify(item)}</p> -->

<!-- <a class="news-item" href="/news/{item.id}" rel=prefetch> -->
<div class="news-item">
	<a href="/news/{item.id}">
		<div class="img">
			<LazyImg {src} {alt}/>
		</div>
		<h2>{item.title}</h2>
	</a>
	<h3>{formattedstamp(item.publishedDatetime)}</h3>
	<p>{summary}</p>
	<!-- <a href="/archive/{item.id}" rel=prefetch>Explore</a> -->
	<Tags {tags}/>
</div>

<script>
	import { formattedstamp } from '../../server/utils/basic-utils'
	import LazyImg from '../../components/shared/LazyImg.svelte'
	import Tags from './_tags.svelte'
	export let item

	$: src = item.cover ?
		`${item.cover.url.split(item.cover.handle)[0]}resize=w:400,h:400,fit:crop/${item.cover.handle}` :
		'https://wearehubgames-website.s3.amazonaws.com/hero/upload/775/logo-blank-big.svg'
	$: alt = item.cover ? item.cover.attribution : 'blank'

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
	.img {
		margin: 0 0 1.2rem;
	}
</style>
