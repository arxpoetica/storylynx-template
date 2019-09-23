<svelte:head><title>Johnny Miller - Global Styles</title></svelte:head>

<h1>Global Styles</h1>

<section class="styles">
	<h1>H1. Lorem ipsum dolor sit amet</h1>
	<h2>H2. Lorem ipsum dolor sit amet</h2>
	<h3>H3. Lorem ipsum dolor sit amet</h3>
	<h4>H4. Lorem ipsum dolor sit amet</h4>
	<h5>H5. Lorem ipsum dolor sit amet</h5>
	<h6>H6. Lorem ipsum dolor sit amet</h6>

	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis elit enim. Sed in tellus eu nunc vulputate euismod non at turpis. In lobortis, odio a consectetur elementum, leo quam consectetur quam, nec laoreet ipsum ante non erat. Morbi at ultricies sapien, quis semper mauris.</p>

	<p class="gs-label">.header</p>
	<p class="header">The Archive</p>

	<p class="gs-label">.serif-header</p>
	<p class="serif-header">The Johnny Miller Experience</p>

	<p class="gs-label">.sm-header</p>
	<p class="sm-header">About</p>

	<p class="gs-label">.subheader</p>
	<p class="subheader">You May Also Like</p>

	<p class="gs-label">.label</p>
	<p class="label">Decade</p>

	<p class="gs-label">.body-copy</p>
	<p class="body-copy" style="max-width: 600px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis elit enim. Sed in tellus eu nunc vulputate euismod non at turpis. In lobortis, odio a consectetur elementum, leo quam consectetur quam, nec laoreet ipsum ante non erat. Morbi at ultricies sapien, quis semper mauris. Mauris vitae ante tempor risus cursus congue. Aenean commodo tempus justo, mattis maximus eros semper a. Vivamus iaculis posuere erat, in dapibus dolor tempor non. Donec convallis sapien condimentum mauris varius, non porttitor dolor laoreet.</p>

	<p class="gs-label">.small-body-copy</p>
	<p class="small-body-copy" style="max-width: 600px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>

	<p class="gs-label">.red | #cc5654</p>
	<div class="color-block red">&nbsp;</div>

	<p class="gs-label">.green | #629275</p>
	<div class="color-block green">&nbsp;</div>

	<p class="gs-label">.black | #000000</p>
	<div class="color-block black">&nbsp;</div>

	<p class="gs-label">.offwhite | #f3f3f2</p>
	<div class="color-block offwhite">&nbsp;</div>

	<p class="gs-label">.gray | #505050</p>
	<div class="color-block gray">&nbsp;</div>
</section>

<style type="text/scss">
	.gs-label {
		font-family: Helvetica, sans-serif;
		font-size: 13rem;
		line-height: 1.3;
		color: #505050;
		margin-bottom: 20rem;
		margin-top: 50rem;
	}
</style>
