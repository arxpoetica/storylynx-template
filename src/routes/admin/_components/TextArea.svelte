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
		top: 0;
		right: 0;
		left: 0;
		padding: 6rem;
		word-break: break-word;
		pointer-events: none;
		opacity: 0;
	}
	textarea {
		padding: 6rem;
		font: inherit;
		resize: none;
		min-height: 34rem;
	}
</style>
