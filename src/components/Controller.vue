<template lang="pug">
	div
		button.start(:disabled="finished" v-show="!running" @click="start_onclick") Start
		button.pause(v-show="running" @click="pause_onclick") Pause
		button.reset(:disabled="running" @click="reset_onclick") Reset
</template>

<style lang="sass" scoped>
	div
		display: flex

	button
		--bg-color: #fff
		--fg-color: #fff

		background-color: var(--bg-color)
		border-style: none
		color: var(--fg-color)
		flex-basis: 100%

		&.start
			--bg-color: #efe
			--fg-color: #060

		&.pause
			--bg-color: #f9f9f9
			--fg-color: #666

		&.reset
			--bg-color: #ffe
			--fg-color: #660

			&:disabled
				--bg-color: #fff
				--fg-color: #ccc

</style>

<script>
	module.exports = {
		props: [
			'running',
			'finished',
			'onControl',
		],

		methods: {
			start_onclick(event) {
				this.onControl({ type: 'start' })
			},

			pause_onclick(event) {
				this.onControl({ type: 'pause' })
			},

			reset_onclick(event) {
				this.onControl({ type: 'reset' })
			},
		},
	}
</script>
