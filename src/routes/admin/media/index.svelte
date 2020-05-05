<!-- DO NOT DELETE THIS FILE OR ANY FILES IN THE /src/routes/admin FOLDER --
	 DOING SO WILL BREAK THE CMS / ADMIN CAPABILITIES OF YOUR APP -->

<div class="admin-header">
	<h1>Edit Post</h1>
	<!-- <div class="buttons">
		{#if !disabled}
			<button class="button blank" on:click={event => discard()}>
				Discard Changes
			</button>
		{/if}
		{#if copy.status === 'PUBLISHED'}
			<button class="button warning" {disabled} on:click={event => save(event, 'DRAFT')}>
				Switch to Draft
			</button>
		{/if}
		<button class="button success" {disabled} on:click={event => save(event, 'PUBLISHED')}>
			{post.status === 'PUBLISHED' ? 'Update' : 'Publish'}
		</button>
	</div> -->
</div>
<div class="admin-main">
	<!-- <form on:submit={event => save(event)}>
		<label>
			Title
			<em> - (Required.)</em>
			<input bind:value={copy.title} type="text" required>
		</label>
		<label>
			Summary
			<input bind:value={copy.summary} type="text">
		</label>
		<Quill title="Content" bind:html={copy.html}/>
	</form> -->
</div>
<div class="admin-side">
	<!-- <div class="accordion">
		<DetailsPanel bind:status={copy.status} bind:datetime={copy.published}/>
		<PermalinkPanel bind:slug={copy.slug}/>
		<MediaPanel bind:copy/>
		<TagsPanel bind:tags bind:copy/>
	</div> -->
</div>
