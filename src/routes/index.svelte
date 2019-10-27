<svelte:head><title>Johnny Miller - Home</title></svelte:head>
<!-- <p><a href="/global-styles">Global Styles</a></p> -->

<div class="full-width chapters">

	<div class="chapter chapter-1">
		<div class="chapter-content">
			<div class="blocks">
				<div class="block block-1"><div class="img"></div></div>
				<div class="block block-2">
					<div class="img">
						<h1 class="ghost">The Johnny Miller Experience</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="chapter chapter-2">
		<div class="chapter-content">
			<blockquote>
				<p>Johnny Miller is a very honest guy.</p>
				<p>That may have been to his detriment sometimes.</p>
				<p>
					On television, he’s too honest.
					We talk about it a lot.
					Do you really need to be that honest?
				</p>
				<p>
					But he’s a good man.
					He’s got good values.
				</p>
				<footer>
					Jack Nicklaus
				</footer>
			</blockquote>
		</div>
	</div>

	<div class="full-width chapter chapter-3">
		<div class="chapter-content">
			<div class="blocks">
				<div class="block block-1">
					<div class="img"></div>
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
					<div class="img"></div>
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
		// .chapter-content {}
		.blocks {
			display: flex;
		}
		.block {
			flex: 1;
		}
		.img {
			height: 100%;
			padding-bottom: 121.5%;
			background: none no-repeat center #e4e3df;
			background-size: cover;
		}
		.block-1 .img { background-image: url('/img/home-main-johnny.jpg'); }
		.block-2 .img { background-image: url('/img/home-main-texts.jpg'); }
	}

	.chapter-2 {
		.chapter-content {
			background: url('/img/home-bg-black.jpg') no-repeat center black;
			background-size: cover;
		}
		blockquote {
			margin: 0 auto;
			padding: 150rem 0 125rem;
			max-width: 950rem;
			text-transform: uppercase;
			text-align: center;
		}
		p {
			margin: 0;
			color: #89a9b5;
			font: $light 34rem/42rem $font;
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
		.blocks {
			display: flex;
		}
		.block {
			position: relative;
			flex: 1;
		}
		.img {
			height: 100%;
			padding-bottom: 90.7%;
			background: none no-repeat center #e4e3df;
			background-size: cover;
		}
		.block-1 .img { background-image: url('/img/square-red.jpg'); }
		.block-2 .img { background-image: url('/img/square-teal.jpg'); }
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
		.medal {
			width: 100%;
		}
		.archive-medal { max-width: 300rem; }
		.about-medal { max-width: 234rem; }
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
</style>
