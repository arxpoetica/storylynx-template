<svelte:head>
	<title>{article.headline} | News | Johnny Miller</title>
</svelte:head>

<!-- {JSON.stringify(article)} -->
<div class="layout-main">
	{#if asset}
		<div class="main-img">
			<LazyImg {src} {alt} width={asset.width} height={asset.height}/>
		</div>
	{/if}
	<div class="box">
		<h1>{article.headline}</h1>
		{#if article.subheadline}
			<h2>{article.subheadline}</h2>
		{/if}

		<div class="info-bar">
			{#if article.byline || formatted_stamp}
				<div class="info">
					{#if article.byline}
						<h3>{article.byline}</h3>
					{/if}
					{#if formatted_stamp}
						<h4>{formatted_stamp}</h4>
					{/if}
				</div>
			{/if}

			<ul class="share">
				<li>
					<a href="https://www.facebook.com/sharer/sharer.php?u={safe_url}" target="_blank" rel="nofollow">
						<FacebookIcon/>
					</a>
				</li>
				<li>
					<!-- FIXME: add the `&via=twitter_account_handle` to the end -->
					<!-- <a href="https://twitter.com/share?text={safe_headline}&url={safe_url}&via=FIXME:" target="_blank" rel="nofollow"> -->
					<a href="https://twitter.com/share?text={safe_headline}&url={safe_url}" target="_blank" rel="nofollow">
						<TwitterIcon/>
					</a>
				</li>
				<li>
					<a href="https://www.linkedin.com/shareArticle?mini=true&url={safe_url}&title={safe_headline}&summary={safe_summary}&source=The%20Johnny%20Miller%20Experience" target="_blank" rel="nofollow">
						<LinkedInIcon/>
					</a>
				</li>
				<li>
					<a href="mailto:?to=&amp;subject={safe_headline}&amp;body={safe_url}" rel="nofollow">
						<EmailIcon/>
					</a>
				</li>
			</ul>

		</div>

		<div class="detail">
			{@html html}
		</div>
		{#if article.linkBack}
			<p class="source-article"><strong>Source article:</strong> <a href={article.linkBack} target="_blank">{article.linkBack}</a></p>
		{/if}
		{#if tags.length}
			<Tags url="/news" {tags}/>
		{/if}
	</div>
</div>

<script context="module">
	import { POST } from '@johnny/utils/loaders'
	export async function preload({ params }) {
		const article = await POST('/api/articles/single.json', { slug: params.slug })
		return { article }
	}
</script>

<script>
	import dayjs from 'dayjs'
	import { src as source } from '@johnny/utils/basic-utils'
	export let article

	import LazyImg from '@johnny/svelte/LazyImg.svelte'
	$: asset = article.assets ? article.assets[0] : false
	$: src = asset ? source(asset, { crop: true, height: Math.floor(asset.height / asset.width * 1000), width: 1000 }) : false
	$: alt = asset ? asset.summary : 'No description for this image.'

	$: formatted_stamp = article.publishedDatetime ? dayjs(article.publishedDatetime).format('MMMM D, YYYY') : false

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = article.detail.html ? article.detail.html.replace(/<p><\/p>/gi, '') : ''

	import Tags from '@johnny/svelte/Tags.svelte'
	$: tags = article.tags.map(tag => tag.tag)

	import FacebookIcon from '@johnny/svg/social-facebook.svelte'
	import TwitterIcon from '@johnny/svg/social-twitter.svelte'
	import LinkedInIcon from '@johnny/svg/social-linkedin.svelte'
	import EmailIcon from '@johnny/svg/social-email.svelte'
	$: safe_headline = encodeURIComponent(article.headline)
	$: safe_summary = encodeURIComponent(article.subheadline)
	$: safe_url = encodeURIComponent(`${process.env.JM_HOST}/news/${article.slug}`)
</script>

<style type="text/scss">
	.main-img {
		overflow: hidden;
		width: 100%;
		max-width: 1000rem;
		max-height: 80vh;
		margin: -50rem auto 50rem;
	}
	.box {
		width: 100%;
		max-width: 800rem;
		margin: 0 auto;
	}
	h1 {
		margin: 0 0 40rem;
	}
	h2 {
		margin: -34rem 0 40rem;
		color: #8c8891;
		font: $light 19rem/1.15 $font;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.detail {
		& :global {
			> p:first-child::first-letter {
				float: left;
				margin: -6rem 0 0 0;
				padding: 0 12rem 6rem 0;
				// background-color: red;
				font-size: 100rem;
				line-height: 80rem;
			}
			img {
				width: 100%;
				margin: 50rem 0;
				line-height: 0;
			}
			img + .source,
			img + .caption {
				margin: -44rem 0 50rem;
			}
			img + .source + .caption {
				margin: -48rem 0 50rem;
			}
			.source {
				color: #b2b2b2;
				font: $light 13rem/18rem $font;
			}
			.caption {
				font: $bold 13rem/18rem $font;
				text-transform: uppercase;
			}
			img,
			.source,
			.caption {
				p {
					margin: 0;
				}
			}
		}
	}
	.info-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 40rem;
		padding: 10rem 0;
		border-top: 1px solid #cdccd0;
		border-bottom: 1px solid #cdccd0;
	}
	.info {
		h3,
		h4 {
			font: 12rem/1.3 $font;
			letter-spacing: 1rem;
			text-transform: uppercase;
		}
		h4 {
			color: #8c8891;
		}
	}
	.share {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			min-width: 22rem;
			margin: 0 0 0 15rem;
		}
		a {
			color: $black;
			transition: color 0.2s ease-in-out;
			&:hover {
				color: $red-main;
			}
		}
	}
	.source-article {
		margin: 25rem 0 50rem;
		padding: 25rem 0 0;
		border-top: 1px solid #cdccd0;
		strong {
			font: $bold 13rem/1.15 $font;
			text-transform: uppercase;
		}
	}
</style>
