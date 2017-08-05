<template lang="pug">
	div

		header.header
			.container
				button.button.done(@click="back_onclick")
					i.fa.fa-arrow-circle-left(aria-hidden="true")
					|  Back

				h1.heading Settings

		.container

			table.settingsTable
				caption Times
				tbody
					tr
						th Time to Talk
						td
							input.timeInput(v-model="allottedTimeText" @change="allottedTime_onchange" type="text")
					tr
						th
							span(v-if="warningAvailable")
								| Warn When at 
								time {{finishingAt | time}}
							span(v-else)
								| No warning
						td
							input(v-model="finishingAt" :max="allottedTime" @change="finishingAt_onchange" type="range" min="0" step="10000")

			table.settingsTable
				caption Preset
				tbody
					tr
						th Default Times
						td
							button.button(@click="resetDefault_onclick" type="button") Reset to Default

					tr
						th Revert
						td
							button.button(@click="revert_onclick" type="button") Revert to the last settings

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
			this.lastAllottedTime = this.$store.state.time.allottedTime
			this.lastFinishingAt = this.$store.state.time.finishingAt

			const data = {
				allottedTime: this.lastAllottedTime,
				finishingAt: this.lastFinishingAt,
			}
			data.allottedTimeText = this.$options.filters.time(data.allottedTime)
			return data
		},

		filters: {
			time(value) {
				const min = Math.floor(value / 60 / 1000)
				const secNumber = Math.floor(value / 1000) % 60
				const sec = secNumber < 10 ? '0' + secNumber : secNumber.toString()
				return `${min}:${sec}`
			},
		},

		computed: {
			warningAvailable() {
				return this.finishingAt > 0
			},
		},

		methods: {
			reload() {
				this.allottedTime = this.$store.state.time.allottedTime
				this.finishingAt = this.$store.state.time.finishingAt

				this.allottedTimeText = this.$options.filters.time(this.allottedTime)
			},

			allottedTime_onchange(event) {
				let allottedTime = 0

				const text = this.allottedTimeText
				// "300" -> 5 min
				if (/^\d+$/.test(text)) {
					allottedTime = parseInt(text, 10) * 1000
				}
				// "5:00" -> 5 min
				// "5:0" -> 5 min
				// ":30" -> 30 sec
				else if (/^\d*:\d\d?$/.test(text)) {
					const [minText, secText] = text.split(':')
					const min = parseInt(minText, 10)
					const sec = parseInt(secText, 10)
					allottedTime = (min * 60 + sec) * 1000
				}

				if (allottedTime < 1) {
					allottedTime = this.$store.state.time.defaultAllottedTime
				}

				this.$store.dispatch('time/setAllotedTime', allottedTime)
				this.reload()
			},

			finishingAt_onchange(event) {
				this.$store.dispatch('time/setFinishingAt', this.finishingAt)
				this.reload()
			},

			goBack() {
				this.$router.push('/')
			},

			back_onclick(event) {
				this.goBack()
			},

			resetDefault_onclick(event) {
				this.$store.dispatch('time/setAllotedTime', this.$store.state.time.defaultAllottedTime)
				this.$store.dispatch('time/setFinishingAt', this.$store.state.time.defaultFinishingAt)
				this.reload()
			},

			revert_onclick(event) {
				this.$store.dispatch('time/setAllotedTime', this.lastAllottedTime)
				this.$store.dispatch('time/setFinishingAt', this.lastFinishingAt)
				this.reload()
			},
		},
	}
</script>
