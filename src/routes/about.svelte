<svelte:head><title>Johnny Miller - Home</title></svelte:head>
<!-- <p><a href="/global-styles">Global Styles</a></p> -->

<div class="full-width chapters">

	<div class="chapter chapter-1">
		<div class="chapter-content">
			<blockquote>
				<h1>About Johnny</h1>
				<p>
					It’s not so much what you accomplish in life that really
					matters, but what you overcome that proves who you are,
					what you are, and whether you are a champion.
				</p>
			</blockquote>
		</div>
	</div>

	<div class="chapter chapter-2"></div>

	<div class="chapter chapter-3">
		<div class="chapter-content">
			<div class="blocks">
				<div class="block block-1">
					<div class="content">
						<div class="thing thing-1"><div class="pod"></div></div>
						<h2 class="h6">About this Project</h2>
						<p>
							Lorem ipsum dolor sit amet, consetetur
							sadipscing elitr, sed diam nonumy eirmod
							tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et
							justo duo dolores.
						</p>
						<a href="/archive" rel=prefetch>Explore</a>
					</div>
				</div>
				<div class="block block-2">
					<div class="content">
						<div class="thing thing-2"><div class="pod"></div></div>
						<h2 class="h6">About the Champ Foundation</h2>
						<p>
							Lorem ipsum dolor sit amet, consetetur
							sadipscing elitr, sed diam nonumy eirmod
							tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et
							justo duo dolores.
						</p>
						<a href="/archive" rel=prefetch>Visit</a>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>


<!-- <script></script> -->

<style type="text/scss">
	// .chapters {}
	// .chapter {}
	// .chapter-content {}

	.chapter-1 {
		border-top: 35rem solid #b7ccc1;
		background: url('/img/about-bg-green.jpg') repeat center #94bfae;
		.chapter-content {
			position: relative;
			background-size: cover;
		}
		blockquote {
			margin: 0 auto;
			padding: 125rem 40rem 150rem;
			max-width: 950rem;
			text-transform: uppercase;
			text-align: center;
		}
		h1 {
			margin-bottom: 60rem;
			color: black;
			font: $bold 13rem/1 $font;
			letter-spacing: 5rem;
		}
		p {
			margin: 0;
			color: white;
			font: $light 34rem/46rem $font;
		}
	}

	.chapter-2 {
		background: url('/img/about-bg.jpg') no-repeat center #dfdeda;
		background-size: cover;
		height: 75vh;
	}

	.chapter-3 {
		// .chapter-content {}
		background: url('/img/square-blue.jpg') repeat 0 0 #93c6ba;
		color: white;
		font: $light 18rem/22rem $font;
		text-align: center;
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 50vw;
			background: url('/img/square-green.jpg') repeat 0 0 #ef6d6b;
		}
		.blocks {
			display: flex;
		}
		.block {
			position: relative;
			flex: 1;
			padding-bottom: 45.35%;
		}
		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			position: absolute;
			top: 40rem;
			right: 120rem;
			bottom: 40rem;
			left: 120rem;
		}
		.thing {
			width: 16.67%;
			margin: 0 auto 40rem;
		}
		.pod {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			background: none no-repeat center transparent;
			background-size: contain;
		}
		.thing-1 .pod { border-bottom: 1px solid white; }
		.thing-2 .pod { background-image: url('/img/about-thing-2.png'); }

		h2 {
			margin: 0 0 30rem;
			font: $bold 13rem/1 $font;
			letter-spacing: 4rem;
		}
		p:last-of-type {
			margin: 0 0 50rem;
		}
		a {
			align-self: center;
			height: 42rem;
			padding: 0 30rem;
			color: white;
			font: $bold 13rem/42rem $font;
			letter-spacing: 4rem;
			text-transform: uppercase;
			border: 1px solid white;
			text-decoration: none;
			transition: all 0.2s ease-in-out;
			&:hover {
				background-color: white;
				color: $black;
			}
		}
	}

	@media (--large) {
		.chapter-3 {
			.content {
				right: 40rem;
				left: 40rem;
			}
		}
	}
	@media (--medium-down) {
		.chapter-2 {
			height: 50vh;
		}
		.chapter-3 {
			background: none;
			&::after { display: none; }
			.blocks { flex-direction: column; }
			.block { padding-bottom: 90.7%; }
			.block-1 { background: url('/img/square-green.jpg') repeat 0 0 #ef6d6b; }
			.block-2 { background: url('/img/square-blue.jpg') repeat 0 0 #93c6ba; }
		}
	}
	@media (--small-down) {
		.chapter-1 {
			blockquote {
				padding: 80rem 40rem;
			}
			p {
				display: inline;
				font: $light 26rem/38rem $font;
			}
		}
		.chapter-3 {
			.block {
				padding: 0;
			}
			.content {
				position: static;
				padding: 80rem 40rem;
			}
		}
	}
</style>
