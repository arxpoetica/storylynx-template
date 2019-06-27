<form on:submit={submit}>
	<h1>Log In</h1>
	{#if message}
		<!-- FIXME: turn this into a component -->
		<div class="error">{message}</div>
	{/if}
	<div class="border">
		<label>Username
			<!-- autofocus="autofocus" -->
			<input bind:value={username} type="text" name="username" required="required">
		</label>
		<label>Password
			<input bind:value={password} type="password" name="password" required="required">
		</label>
	</div>
	<button type="submit" class="button">Log In</button>
</form>

<script context="module">
	export function preload(page, session) {
		if (session.user) { return this.redirect(302, '/') }
		return {}
	}
</script>

<script>
	import { stores } from '@sapper/app'
	const { session } = stores()
	import { POST } from '../../server/utils/loaders'

	let message
	let username = ''
	let password = ''

	export async function submit(event) {
		event.preventDefault()
		const formData = { username, password }
		const user = await POST('/api/auth/login.json', formData)
		if (user.message) {
			message = user.message
		} else {
			session.set(Object.assign({}, $session, { user }))
			// FIXME: let's get rid of reload if possible
			window.location.reload(true)
		}
	}
</script>

<style type="text/scss">
	form {
		max-width: 400px;
		margin: 0 auto;
	}
	.error {
		margin: 0 0 10rem;
		padding: 10rem;
		background-color: $red-l5;
		border: 1px solid $red-main;
		color: $red-dark;
		font-weight: $bold;
	}
	.border {
		margin: 0 0 12px;
		padding: 12px;
		border: 1px solid $teal-main;
		border-radius: 2px;
		:last-child {
			input[type="password"] {
				margin-bottom: 0;
			}
		}
	}
	// h2 {
	// 	margin: 0 0 12rem;
	// 	font: $bold 16rem/1.2 $font;
	// }
	input[type="text"],
	input[type="password"] {
		padding: 0 12rem;
		height: 50rem;
		font: 16rem/1 $font;
	}
	.button {
		width: 100%;
		padding: 12rem;
		font: $bold 16rem/1 $font;
	}
</style>
