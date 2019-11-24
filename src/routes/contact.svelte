<svelte:head><title>Johnny Miller - Contact</title></svelte:head>

<BannerHeader title="Contact"/>
<div class="layout-main">
	<ul class="contact">
		<li>
			<h2>For General Inquiries</h2>
			<a href="mailto:info@johnnymiller.com">info@johnnymiller.com</a>
		</li>
		<li>
			<h2>For Press inquiries</h2>
			<a href="mailto:press@johnnymiller.com">press@johnnymiller.com</a>
		</li>
		<li>
			<h2>For Autographs & Other Fan Requests</h2>
			<a href="mailto:fans@johnnymiller.com">fans@johnnymiller.com</a>
		</li>
		<li class="social">
			<h2>Follow Johnny on Social Media</h2>
			<ul>
				<li class="youtube">
					<div class="ghost">Follow on Youtube</div>
					<a href="..."><YoutubeIcon/></a>
				</li>
				<li class="instagram">
					<div class="ghost">Follow on Instagram</div>
					<a href="..."><InstagramIcon/></a>
				</li>
				<li class="twitter">
					<div class="ghost">Follow on Twitter</div>
					<a href="..."><TwitterIcon/></a>
				</li>
				<li class="facebook">
					<div class="ghost">Follow on Facebook</div>
					<a href="..."><FacebookIcon/></a>
				</li>
			</ul>
		</li>
	</ul>
</div>

<script>
	import BannerHeader from '@johnny/svelte/BannerHeader.svelte'
	import YoutubeIcon from '@johnny/svg/social-youtube.svelte'
	import InstagramIcon from '@johnny/svg/social-instagram.svelte'
	import TwitterIcon from '@johnny/svg/social-twitter.svelte'
	import FacebookIcon from '@johnny/svg/social-facebook.svelte'
</script>

<style type="text/scss">
	.contact {
		font: $bold 28rem/34rem $font;
		text-align: center;
		text-transform: uppercase;
	}
	h2 {
		margin: 0;
		color: #939598;
		font: $bold 11rem/14rem $font;
		letter-spacing: 6rem;
		text-transform: uppercase;
		+ a {
			display: inline-block;
			margin: 0 0 100rem;
			letter-spacing: 1rem;
		}
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.social {
		ul {
			display: flex;
			justify-content: space-between;
			width: 100%;
			max-width: 275rem;
			margin: 0 auto;
		}
		li {
			margin-top: 20rem;
		}
		a {
			display: flex;
			align-items: center;
			min-width: 35rem;
			height: 35rem;
		}
	}
	a {
		color: $black;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
		&:hover {
			color: $red-main;
		}
	}
	@media (--small) {
		.contact { font: $bold 25rem/35rem $font; }
		h2 + a { margin: 0 0 50rem; }
	}
	@media (--smallest) {
		.contact { font: $bold 18rem/28rem $font; }
		h2 + a { margin: 0 0 50rem; }
	}
</style>
