<footer>
    <div class="footer-evil-wrap">
        <a data-on="{segment === 'terms'}"href="/terms">Terms &amp; Conditions</a>
        <a data-on="{segment === 'privacy'}"href="/privacy-policy">Privacy Policy</a>

        <a class="cobranding" href="https://www.johnnymillerchampfoundation.org/" target="_blank">The Champ Foundation</a>
    </div>
</footer>

<script>
    export let segment
</script>

<style type="text/scss">
    footer {
        height: $footer-height;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: $bg2;
		color: $black;
		font: 1.3rem/1 $font;
        a {
			height: 28px;
			padding: 0 8px;
			border-radius: 1px;
			color: $black;
			line-height: 2.8rem;
			text-decoration: none;
			transition: background-color 0.15s ease-in-out;
			&:hover,
			&:focus {
				background-color: $yellow-light
            }
            &.cobranding {
                margin-left: auto;
            }
		}
	}
	.footer-evil-wrap {
		display: flex;
		align-items: center;
		height: $footer-height;
		margin: 0 auto;
		padding: 0 20px
	}
</style>
