<template lang="pug">
	.main(@submit.prevent="onsubmit")

		header.header
			.container
				h1.heading Settings

				.buttonRow
					button.button.cancel Cancel
					button.button.done Save

		form.container

			table.settingsTable
				caption Times
				tbody
					tr
						th Time to Talk
						td
							input.timeInput(v-model="allottedTimeText" @change="allottedTime_onchange" type="text")
					tr
						th
							| Warn When at 
							time {{finishingAt | time}}
						td
							input(v-model="finishingAt" :max="allottedTime" @change="" type="range" min="0" step="10000")

			table.settingsTable
				caption Preset
				tbody
					tr
						th Default Times
						td
							button.button(@click="resetDefault_onclick") Reset to Default

</template>

<style lang="sass" spec>
	.header
		border-bottom: 1px solid #999
		margin-bottom: 1em

	.heading
		font-family: sans-serif
		font-weight: bold

	.settingsTable
		border-collapse: collapse
		width: 100%

		& > caption
			background-color: #f9f9f9
			color: #333
			font-family: sans-serif
			font-size: 1em
			padding: 0.5em 1em
			text-align: left

		& > tbody, tr
			& > th,
			& > td
				border-bottom: 1px solid #f9f9f9
				font-weight: normal
				padding: 0.5em 1em
				width: 50%

			& > th
				text-align: left

			&:last-child
				& > th,
				& > td
					border-bottom-style: none

	.buttonRow
		display: flex
		margin-bottom: 1em

	.button
		--bg-color: #f9f9f9
		--fg-color: #666

		background-color: var(--bg-color)
		border-style: none
		// border: 1px solid var(--fg-color)
		color: var(--fg-color)
		flex-basis: 100%
		padding: 1em

		&.done
			--bg-color: #efe
			--fg-color: #060

	.timeInput
		text-align: right

</style>

<script>
	module.exports = {
		data() {
			return {
				allottedTime: 300000,
				allottedTimeText: this.$options.filters.time(300000),
				finishingAt: 60000,
			}
		},

		filters: {
			time(value) {
				const min = Math.floor(value / 60 / 1000)
				const secNumber = Math.floor(value / 1000) % 60
				const sec = secNumber < 10 ? '0' + secNumber : secNumber.toString()
				return `${min}:${sec}`
			},
		},

		methods: {
			allottedTime_onchange(event) {
				const text = this.allottedTimeText
				// "300" -> 5 min
				if (/^\d+$/.test(text)) {
					this.allottedTime = parseInt(text, 10) * 1000
				}
				// "5:00" -> 5 min
				// "5:0" -> 5 min
				// ":30" -> 30 sec
				else if (/^\d*:\d\d?$/.test(text)) {
					const [minText, secText] = text.split(':')
					const min = parseInt(minText, 10)
					const sec = parseInt(secText, 10)
					this.allottedTime = (min * 60 + sec) * 1000
				}

				if (this.allottedTime < 10) {
					this.allottedTime = 300000
				}

				this.allottedTimeText = this.$options.filters.time(this.allottedTime)

				if (this.finishingAt > this.allottedTime) {
					this.finishingAt = 0
				}
			},

			resetDefault_onclick(event) {
				this.allottedTime = 300000
				this.allottedTimeText = this.$options.filters.time(300000)
				this.finishingAt = 60000
			},

			onsubmit(event) {
				console.debug('hello');
			},
		},
	}
</script>
