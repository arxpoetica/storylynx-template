<footer class="layout-outer">
	<nav class="layout-inner">
		<ul>
			<li>Copyright &copy; 2019 {process.env.LYNX_SITE_NAME}</li>
		</ul>
		<ul class="share">
			<li><a href="https://www.facebook.com" target="_blank" rel="nofollow"><FacebookIcon/></a></li>
			<li><a href="https://aboutme.google.com" target="_blank" rel="nofollow"><GoogleIcon/></a></li>
			<li><a href="https://www.instagram.com/" target="_blank" rel="nofollow"><InstagramIcon/></a></li>
			<li><a href="https://www.linkedin.com" target="_blank" rel="nofollow"><LinkedinIcon/></a></li>
			<li><a href="https://twitter.com" target="_blank" rel="nofollow"><TwitterIcon/></a></li>
			<li><a href="https://www.youtube.com/" target="_blank" rel="nofollow"><YoutubeIcon/></a></li>
			<li><a href="mailto:?to=&amp;subject=headline&amp;body=body" rel="nofollow"><EmailIcon/></a></li>
		</ul>
	</nav>
</footer>

<script>
	import FacebookIcon from '@lynx/svg/social-facebook.svelte'
	import GoogleIcon from '@lynx/svg/social-google.svelte'
	import InstagramIcon from '@lynx/svg/social-instagram.svelte'
	import LinkedinIcon from '@lynx/svg/social-linkedin.svelte'
	import TwitterIcon from '@lynx/svg/social-twitter.svelte'
	import YoutubeIcon from '@lynx/svg/social-youtube.svelte'
	import EmailIcon from '@lynx/svg/social-email.svelte'
</script>

<style type="text/scss">
	// footer {
	// }
	.layout-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		padding: 20rem;
	}
	ul {
		display: flex;
	}
	ul {
		display: flex;
		margin: 0 0 20rem;
	}
	li {
		margin: 0 10rem;
	}
	.share {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			width: 20rem;
			margin: 0 10rem 10rem;
		}
		a {
			display: block;
			width: 100%;
			height: 100%;
			color: $black;
			transition: color 0.2s ease-in-out;
			&:hover {
				color: $links;
			}
		}
	}
	@media (--medium-down) {
		ul {
			flex-direction: column;
		}
		li {
			display: flex;
			justify-content: center;
			text-align: center;
		}
	}
</style>
