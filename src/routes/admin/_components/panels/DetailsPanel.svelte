<Panel title="Details" type="details" state="open">
	<ul>
		<li><strong>Visibility:</strong> {status}</li>
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
	import dayjs from 'dayjs'
	import Panel from './Panel.svelte'
	import DateTimePicker from '../DateTimePicker.svelte'
	export let status
	export let datetime
	let open = false
</script>

<style type="text/scss">
	.datetime {
		color: $links;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
