<div class="full-width layout-outer">
	<div class="layout-inner">
		<h1>{title}</h1>
		<slot></slot>
	</div>
</div>

<script>
	export let title = ''
</script>

<style type="text/scss">
	.layout-outer {
		margin-bottom: 25rem;
		padding-top: 30rem;
		padding-bottom: 85rem;
		background-color: $gray-light;
	}
	h1 {
		margin: 0;
		color: $red-main;
		text-align: center;
	}
</style>
