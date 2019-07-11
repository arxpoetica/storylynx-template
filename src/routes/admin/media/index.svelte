<div class="admin-header">
	<h1>Edit News Article</h1>
	<!-- <div class="buttons">
		{#if !disabled}
			<button class="button blank" on:click={event => discard()}>
				Discard Changes
			</button>
		{/if}
		{#if articleCopy.status === 'PUBLISHED'}
			<button class="button warning" {disabled} on:click={event => save(event, 'DRAFT')}>
				Switch to Draft
			</button>
		{/if}
		<button class="button success" {disabled} on:click={event => save(event, 'PUBLISHED')}>
			{article.status === 'PUBLISHED' ? 'Update' : 'Publish'}
		</button>
	</div> -->
</div>
<div class="admin-main">
	<!-- <form on:submit={event => save(event)}>
		<label>
			Title
			<em> - (Required.)</em>
			<input bind:value={articleCopy.title} type="text" required>
		</label>
		<label>
			Summary
			<input bind:value={articleCopy.summary} type="text">
		</label>
		<Quill title="Content" bind:html={articleCopy.html}/>
	</form> -->
</div>
<div class="admin-side">
	<!-- <div class="accordion">
		<DetailsPanel bind:status={articleCopy.status} bind:datetime={articleCopy.publishedDatetime}/>
		<PermalinkPanel bind:slug={articleCopy.slug}/>
		<AssetsPanel bind:articleCopy/>
		<TagsPanel bind:tags bind:articleCopy/>
	</div> -->
</div>
