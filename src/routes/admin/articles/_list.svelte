<div class="list">
	{#each items as item}
		<a href="/admin/articles/edit/{item.id}">
			{#if item.cover}
				<div class="cover" style="background-image:url(https://media.graphcms.com/output=format:jpg/resize=w:59,h:59,fit:crop/{item.cover.handle});"></div>
			{:else}
				<div class="cover"></div>
			{/if}
			<div class="detail">
				<h2>{item.title}</h2>
				<h3>Posted: {dayjs(item.publishedDatetime).format('MMMM DD, YYYY, h:mma')}</h3>
				<p>{item.summary}</p>
				<ListTags tags={item.tags.map(tag => tag.tag)}/>
			</div>
		</a>
	{/each}
</div>

<script>
	import dayjs from 'dayjs'
	import ListTags from '../_components/ListTags.svelte'
	export let items
</script>

<style type="text/scss">
	.list {
		overflow: auto;
	}
	a {
		display: flex;
		margin: 0 0 8rem;
		padding: 6rem 12rem;
		background-color: $gray-light;
		border: 1px solid $gray-6;
		border-radius: 2px;
		text-decoration: none;
		transition: background-color 0.2s ease-in-out;
		&:hover {
			background-color: $gray-7;
		}
	}
	.cover {
		min-width: 59rem;
		height: 59rem;
		margin-right: 12rem;
		background-color: $gray-6;
	}
	h3,
	p {
		margin: 0;
	}
</style>
