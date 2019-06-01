<!-- <p>{JSON.stringify(resource)}</p> -->

<div class="resource">
	<a href="/archive/{resource.id}" rel=prefetch>
		<LazyImg {src} {alt}/>
		<h2>{resource.title || '[This resource has no title.]'}</h2>
		<h3>{formattedstamp(resource.createdAt)}</h3>
	</a>
	<p>{summary}</p>
	<h4>Tags:</h4>
	<div class="tags">
		{#each resource.tags as tag}
			<strong>{tag}</strong>
		{/each}
	</div>
</div>

<script>
	import { formattedstamp } from '../../server/utils/basic-utils'
	import LazyImg from '../../components/shared/LazyImg.svelte'
	export let resource

	// FIXME: have a better backup asset
	$: src = resource.thumb ? resource.thumb : 'https://wearehubgames-website.s3.amazonaws.com/hero/upload/775/logo-blank-big.svg'
	$: alt = resource.summary ? resource.summary : 'blank'

	let summary = ''
	$: if (resource.summary) {
		summary = resource.summary
	// } else if (resource.content.text) { // FIXME: change content type to RichTextAST:
	// 	const text = resource.content.text
	// 	summary = text.length > 100 ? text.slice(0, 99).trim() + '...' : text
	} else {
		summary = 'No summary.'
	}
</script>

<style type="text/scss">
	.resource {
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
