<Panel title="Assets" type="assets">

	<div class="upload">
		<button class="button warning">Open Asset Upload Window</button>
	</div>

	<!-- <img src={articleCopy.cover.url} alt={articleCopy.cover.summary || 'No alt information.'}/> -->
</Panel>

<script>
	import Panel from './Panel.svelte'
	export let articleCopy
	let file
	let filelist = []
</script>

<style type="text/scss">
	.upload {
		overflow: hidden;
		margin: 12rem 0;
		background-color: $gray-7;
		border-radius: 12rem;
	}
	label {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 24rem 12rem;
		font-weight: $bold;
		cursor: pointer;
	}
	em {
		text-decoration: underline;
		font-style: normal;
	}
	input[type="file"] {
		display: none;
	}
</style>
