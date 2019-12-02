<div class:show class="shell" style="padding-bottom:{height / width * 100}%;">
	<img {src} {alt} use:lazy/>
	{#if loaded}
		<div class:show class="img" {style}>
			<div class="ghost">{alt}</div>
		</div>
	{:else}
		<div class="svg">
			<Hourglass/>
		</div>
	{/if}
</div>

<script>
	import Hourglass from '@lynx/svg/hourglass.svelte'
	export let src
	export let alt = 'No information present about this image.'
	export let width = 100
	export let height = 100
	export let loaded = false
	let show = false

	$: style = `background-image:url(${src});`

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
		height: 0;
		background-color: #f5f5f5;
		background-color: rgb(2, 0, 36);
		background: linear-gradient(45deg, $white, #f5f5f5);
		background-size: 400%;
		animation: shine 2s linear infinite;
		&.show {
			animation: none;
		}
	}
	@keyframes shine {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
	.img {
		position: absolute;
		top: 0;
		left: 0;
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
		top: 0;
		left: 0;
		pointer-events: none;
	}
	.svg {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30rem;
		height: 47rem;
		margin: -24rem 0 0 -15rem;
		color: #ececec;
	}
</style>
