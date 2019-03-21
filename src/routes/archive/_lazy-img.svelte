<div class="shell">
	<img {src} alt="" use:lazy/>
	{#if loaded}
		<div class="img {show ? 'show' : ''}" style="background-image:url({src});"></div>
	{:else}
		<p>Loading . . .</p>
	{/if}
</div>

<script>
	import { onMount, tick } from 'svelte'
	export let src
	// export let alt
	export let loaded = false
	let show = false

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
		width: 100px;
		height: 100px;
		background-color: $gray-6;
		box-shadow: 0 0 2px $gray-4;
	}
	.img {
		width: 100%;
		height: 100%;
		background: none no-repeat center transparent;
		background-size: cover;
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
