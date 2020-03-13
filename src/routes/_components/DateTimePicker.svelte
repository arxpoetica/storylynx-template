{#if selected}
	<div class="datetime-picker">
		<div class="calendar">
			<div class="years">
				{#each years as eachYear}
					{#if eachYear === year}
						<div class="year on">{eachYear}</div>
					{:else}
						<div class="year" on:click={() => setDate({ year: eachYear })}>{eachYear}</div>
					{/if}
				{/each}
			</div>
			<div class="months">
				{#each { length: 12 } as _, index}
					{#if index === month - 1}
						<div class="month on">{months[index]}</div>
					{:else}
						<div class="month" on:click={() => setDate({ month: index + 1 })}>{months[index]}</div>
					{/if}
				{/each}
			</div>
			<div class="days">
				<div class="head">
					{#each days as day}
						<div>{day}</div>
					{/each}
				</div>
				<div class="body" style="grid-template-rows: repeat({rows}, minmax(33rem, auto));">
					{#each { length: startOfMonth - 1 } as blank}
						<div></div>
					{/each}
					{#each { length: daysInMonth } as _, index}
						{#if index === date - 1}
							<div class="on">{index + 1}</div>
						{:else}
							<div on:click={() => setDate({ date: index + 1 })}>{index + 1}</div>
						{/if}
					{/each}
				</div>
			</div>
			{#if notToday}
				<button on:click={setToToday} class="button small warning">Jump to Today</button>
			{/if}
		</div>
	</div>
{/if}

<script>
	import { onMount } from 'svelte'
	import dayjs from 'dayjs'
	import { range } from '@johnny/utils/basic-utils'
	export let datetime

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	let selected
	onMount(() => selected = dayjs(datetime))
	let minute, hour, date, dayOfWeek, month, daysInMonth, startOfMonth, year, years, rows
	$: if (selected) {
		minute = selected.minute()
		hour = selected.hour()
		date = selected.date()
		dayOfWeek = selected.day() + 1
		month = selected.month() + 1
		daysInMonth = selected.daysInMonth()
		startOfMonth = selected.startOf('month').day() + 1
		year = selected.year()
		years = [...range(year - 4, year - 1), year, ...range(year + 1, year + 4)]
		rows = Math.ceil((daysInMonth + startOfMonth - 1) / 7)
	}

	let today = dayjs(new Date())
	$: notToday = selected && (
		today.date() !== selected.date()
		|| today.month() !== selected.month()
		|| today.year() !== selected.year()
	)
	function setToToday() {
		today = dayjs(new Date()) // just updating since time always passes
		setDate({ date: today.date(), month: today.month() + 1, year: today.year() })
	}

	function setDate(settings) {
		let newDatetime = selected.clone()
		if (settings.year) { newDatetime = newDatetime.year(settings.year) }
		if (settings.month) { newDatetime = newDatetime.month(settings.month - 1) }
		if (settings.date) { newDatetime = newDatetime.date(settings.date) }
		if (settings.hour) { newDatetime = newDatetime.hour(settings.hour) }
		if (settings.minute) { newDatetime = newDatetime.minute(settings.minute) }
		// console.log(selected.toISOString())
		// console.log(newDatetime.toISOString())
		selected = dayjs(newDatetime)
		datetime = selected.toISOString()
	}
</script>

<style type="text/scss">
	// .datetime-picker {
	// }
	.years {
		display: grid;
		margin: 0 0 4rem;
		padding: 0 22rem 8rem;
		grid-template-rows: repeat(3, 26rem);
		grid-template-columns: repeat(3, 1fr);
		border-bottom: 1px solid $gray-6;
	}
	.year {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4rem;
		cursor: pointer;
		&:hover {
			background-color: $teal-l3;
		}
		&.on {
			background-color: $teal-main;
			color: $white;
			font-weight: $bold;
			pointer-events: none;
		}
	}
	.months {
		display: grid;
		margin: 0 0 4rem;
		padding: 8rem 22rem;
		grid-template-rows: 26rem 26rem;
		grid-template-columns: repeat(6, 1fr);
		border-bottom: 1px solid $gray-6;
	}
	.month {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4rem;
		cursor: pointer;
		&:hover {
			background-color: $teal-l3;
		}
		&.on {
			background-color: $teal-main;
			color: $white;
			font-weight: $bold;
			pointer-events: none;
		}
	}
	.days {
		margin: 0 22rem;
	}
	.head,
	.body {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		> div {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.head {
		grid-template-rows: minmax(33rem, auto);
	}
	.body {
		> div {
			border-radius: 100%;
			cursor: pointer;
			&:hover {
				background-color: $teal-l3;
			}
			&.on {
				background-color: $teal-main;
				color: $white;
				font-weight: $bold;
				pointer-events: none;
			}
		}
	}
	button {
		display: block;
		margin: 0 auto;
	}
</style>
