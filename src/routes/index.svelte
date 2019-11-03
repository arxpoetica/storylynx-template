<svelte:head><title>Johnny Miller - Home</title></svelte:head>
<!-- <p><a href="/global-styles">Global Styles</a></p> -->

<div class="full-width chapters">

	<div class="chapter chapter-1">
		<div class="chapter-content">
			<div class="blocks">
				<div class="block block-1"><div class="img"></div></div>
				<div class="block block-2">
					<div class="img"></div>
					<div class="detail">
						<div class="logo"></div>
						<h1><span>The </span><strong>Johnny <br>Miller</strong> <span>Experience</span></h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br>Proin porta justo.</p>
						<div class="button" disabled>Coming Soon</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="chapter chapter-2">
		<div class="chapter-content">
			<blockquote>
				<!-- https://www.golfdigest.com/story/7-questions-with-dan-hicks-on-johnny-miller-the-quirks-you-dont-see-johnnys-legendary-lexicon-and-what-hell-miss-most-about-miller -->
				<!-- I’ll miss most, in addition to the broadcasting brilliance, and just never a dull moment and every single show he makes so interesting, I’ll miss just as much just being with him. -->
				<p>In addition to the broadcasting brilliance,</p>
				<!-- <p>some of the things we talk about in the tower before we go on the air.</p> -->
				<p>It’s not all golf, it’s not all research.</p>
				<p>We talk about life, we talk about family.</p>
				<p>
					He has given me more nuggets of wisdom about being a good father,
					being a good husband, and being a good friend than anyone I’ve ever known in my life.
				</p>
				<footer>Dan Hicks</footer>
			</blockquote>
		</div>
	</div>

	<div class="chapter chapter-3">
		<div class="chapter-content">
			<div class="blocks">
				<div class="block block-1">
					<a href="/archive" class="content" rel=prefetch>
						<h2>
							Archive
							<span>02</span>
						</h2>
						<div class="medal-hold">
							<div class="medal archive-medal">
								<div class="pod"></div>
							</div>
						</div>
					</a>
				</div>
				<div class="block block-2">
					<a href="/about" class="content" rel=prefetch>
						<h2>
							About
							<span>03</span>
						</h2>
						<div class="medal-hold">
							<div class="medal about-medal">
								<div class="pod"></div>
							</div>
						</div>
					</a>
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
		border-top: 35rem solid #e4e3df;
		background: url('/img/home-gray.jpg') repeat 0 0 #dfdeda;
		// .chapter-content {}
		.blocks {
			display: flex;
			position: relative;
			&::before,
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				bottom: 0;
				background-color: rgba(255, 255, 255, 0.4);
				z-index: 2;
			}
			&::before {
				right: 96.5%;
				left: -3.5%;
			}
			&::after {
				right: 45%;
				left: 45.5%;
			}
		}
		.block {
			position: relative;
			flex: 1;
		}
		.img {
			height: 100%;
			padding-bottom: 127.21%;
			background: none no-repeat center transparent;
			background-size: cover;
		}
		.block-1 .img { background-image: url('/img/home-main-johnny.jpg'); }
		.detail {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			padding: 0 40rem;
			text-align: center;
			> * {
				position: relative;
				z-index: 2;
			}
		}
		.logo {
			position: absolute;
			top: 24.5%;
			left: 9.5%;
			height: 19.6365%;
			width: 88.2865%;
			background: url('/img/logo-home.png') no-repeat center transparent;
			background-size: contain;
			z-index: 1;
		}
		h1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin: 31% 0 0;
			color: #939291;
			font: $bold 16rem/1 $font;
			letter-spacing: 5rem;
			br { display: none; }
			:first-child {
				margin-bottom: 17.55%;
			}
			strong {
				margin-bottom: 3.1%;
				font: $bold 20rem/1 $font;
				letter-spacing: 12rem;
				color: #e36362;
			}
			// :last-child {}
			&:after {
				content: '';
				display: block;
				width: 85rem;
				height: 1rem;
				margin: 13% auto;
				background-color: $black;
			}
		}
		p {
			width: 50%;
			margin-bottom: 13%;
			font: 20rem/24rem $font;
		}
	}

	.chapter-2 {
		background: url('/img/home-bg-black.jpg') repeat 0 0 #323232;
		// .chapter-content {}
		blockquote {
			margin: 0 auto;
			padding: 150rem 40rem 125rem;
			max-width: 950rem;
			text-transform: uppercase;
			text-align: center;
		}
		p {
			margin: 0;
			color: #89a9b5;
			font: $light 34rem/46rem $font;
		}
		footer {
			margin-top: 60rem;
			color: #eec167;
			font: $bold 13rem/1 $font;
			letter-spacing: 5rem;
		}
	}

	.chapter-3 {
		// .chapter-content {}
		background: url('/img/square-teal.jpg') repeat 0 0 #93c6ba;
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 50vw;
			background: url('/img/square-red.jpg') repeat 0 0 #ef6d6b;
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
			position: absolute;
			top: 50rem;
			right: 50rem;
			bottom: 50rem;
			left: 50rem;
			text-decoration: none;
		}
		h2 {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding-bottom: 10rem;
			border-bottom: 1px solid white;
			color: white;
			font: $bold 17rem/1 $font;
			letter-spacing: 3rem;
			text-transform: uppercase;
		}
		span {
			font: 15rem/1 $font;
			letter-spacing: 2rem;
		}
		.medal-hold {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
		}
		// .medal {
		// 	width: 100%;
		// }
		.archive-medal { width: 60%; }
		.about-medal { width: 46.8%; }
		.pod {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			background: none no-repeat center transparent;
			background-size: contain;
		}
		.archive-medal .pod { background-image: url('/img/home-medal-archive.png'); }
		.about-medal .pod {
			background-image: url('/img/home-medal-about.png');
			padding-bottom: 83.76%;
		}
	}

	@media (--large-to-medium) {
		.chapter-1 {
			.logo { top: 20.5%; }
			h1 {
				margin-top: 27%;
				br { display: block; }
				:first-child { margin-bottom: 20%; }
				strong { margin-bottom: 3.1%; }
				&:after { margin: 8% auto; }
			}
			p {
				width: 80%;
				margin-bottom: 8%;
				font-size: 17rem;
			}
		}
	}
	@media (--small-down) {
		.chapter-1 {
			.blocks {
				display: block;
				&::before { display: none; }
				&::after {
					top: 48%;
					right: 0;
					bottom: 47%;
					left: 0;
				}
			}
			.img { position: relative; }
			.block-2 .img::after {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				height: 10%;
				margin-top: -5%;
				background-color: rgba(255, 255, 255, 0.4);
			}
			p { width: 75%; }
		}
		.chapter-2 {
			blockquote {
				padding: 80rem 40rem;
			}
			p {
				display: inline;
				font: $light 26rem/38rem $font;
			}
		}
		.chapter-3 {
			background: none;
			&::after { display: none; }
			.blocks { flex-direction: column; }
			.block { padding-bottom: 90.7%; }
			.block-1 { background: url('/img/square-red.jpg') repeat 0 0 #ef6d6b; }
			.block-2 { background: url('/img/square-teal.jpg') repeat 0 0 #93c6ba; }
		}
	}
	@media (--smallest) {
		.chapter-1 {
			.logo { top: 20.5%; }
			h1 {
				margin-top: 27%;
				br { display: block; }
				:first-child { margin-bottom: 20%; }
				strong { margin-bottom: 3.1%; }
				&:after { margin: 8% auto; }
			}
			p {
				width: 100%;
				margin-bottom: 8%;
				font-size: 17rem;
			}
		}
	}
</style>
