<div class="shell">
	<img {src} {alt} use:lazy/>
	{#if loaded}
		<div class="img {show ? 'show' : ''}" {style}></div>
	{:else}
		<p>Loading . . .</p>
	{/if}
</div>

<script>
	import { onMount, tick } from 'svelte'
	export let src
	export let alt = 'No information present about this image.'
	export let width = 100
	export let height = 100
	export let loaded = false
	let show = false

	let style = ''
	$: style =
		`background-image:url(${src});` +
		(width !== 100 || height !== 100 ? `padding-bottom:${height / width * 100}%;` : '')

	function lazy(node) {
		if (loaded) {
			node.setAttribute('src', src)
		} else {
			const img = new Image()
			img.onload = () => {
				loaded = true
				node.setAttribute('src', src)
				setTimeout(() => show = true, 100)
			}
			img.src = src
		}
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.shell {
		position: relative;
		width: 100%;
		// background-color: $gray-6;
		// box-shadow: 0 0 2px $gray-4;
	}
	.img {
		width: 100%;
		height: 0;
		margin: 0 0 40rem;
		padding-bottom: 100%;
		background: none no-repeat center transparent;
		// background-size: 80%;
		background-size: contain;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		&.show {
			opacity: 1;
		}
	}
	img {
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}
</style>
