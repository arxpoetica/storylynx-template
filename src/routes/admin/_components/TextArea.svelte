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
		font: 1.6rem/1.4 $mono-font;
	}
	.measure {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		padding: 0.6rem;
		word-break: break-word;
		pointer-events: none;
		opacity: 0;
	}
	textarea {
		padding: 0.6rem;
		font: inherit;
		resize: none;
		min-height: 3.4rem;
	}
</style>
