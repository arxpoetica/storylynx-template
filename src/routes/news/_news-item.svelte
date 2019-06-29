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
	<Tags url="/news" {tags}/>
</div>

<script>
	import { formattedstamp } from '@johnny/utils/basic-utils'
	import LazyImg from '../../components/shared/LazyImg.svelte'
	import Tags from '../_components/Tags.svelte'
	export let item

	$: src = item.cover ?
		`${item.cover.url.split(item.cover.handle)[0]}resize=w:400,h:400,fit:crop/${item.cover.handle}` :
		'https://wearehubgames-website.s3.amazonaws.com/hero/upload/775/logo-blank-big.svg'
	$: alt = item.cover ? item.cover.attribution : 'blank'

	let summary = ''
	$: if (item.summary) {
		summary = item.summary
	// FIXME:
	// FIXME:
	// FIXME:
	// FIXME:
	// } else if (item.content.text) {
	// 	const text = item.content.text
	// 	summary = text.length > 100 ? text.slice(0, 99).trim() + '...' : text
	} else {
		summary = 'No summary.'
	}

	$: tags = item.tags.map(tag => tag.tag)
</script>

<style type="text/scss">
	.news-item {
		flex: 1;
		max-width: 400rem;
		min-width: 300rem;
		margin: 0 6rem 12rem;
		padding: 12rem 20rem;
		background-color: $gray-7;
		box-shadow: 0 0 2px $gray-5;
	}
	.img {
		margin: 0 0 12rem;
	}
</style>
