<Panel title="Details" type="details" state="open">
	<ul>
		{#if $page.params.id !== 'new'}
			<li><strong>Visibility:</strong> {status}</li>
		{/if}
		<li>
			<strong>Date & Time:</strong>
			<span class="datetime" on:click={() => open = !open}>
				{dayjs(datetime).format('MMM D, YYYY @ h:mma')}
			</span>
		</li>
	</ul>
	{#if open}
		<DateTimePicker bind:datetime/>
	{/if}
</Panel>

<script>
	import { page } from '$app/stores'
	import dayjs from 'dayjs'
	import Panel from './Panel.svelte'
	import DateTimePicker from '../DateTimePicker.svelte'
	export let status
	export let datetime
	let open = false
</script>

<style lang="scss">
	.datetime {
		color: $links;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
