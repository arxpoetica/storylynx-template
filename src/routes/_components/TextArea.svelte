<div class="textarea">
	<div class="measure" bind:clientHeight>{value}</div>
	<textarea bind:this={textarea} bind:value style="height:{clientHeight}px;" placeholder="Enter / edit content as underlying HTML..."></textarea>
</div>

<script>
	export let value = ''
	let textarea
	let clientHeight
</script>

<style type="text/scss">
	.textarea {
		position: relative;
		font: 16rem/1.4 $mono-font;
	}
	.measure {
		position: absolute;
		top: 1px;
		right: 1px;
		left: 1px;
		padding: 6rem;
		word-break: break-word;
		white-space: pre-wrap;
		pointer-events: none;
		opacity: 0;
		// opacity: 0.5;
		// background-color: pink;
	}
	textarea {
		padding: 6rem;
		font: inherit;
		resize: none;
		min-height: 34rem;
		max-height: 50vh;
	}
</style>
