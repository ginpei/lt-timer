<template lang="pug">
	div
		button.start(:disabled="finished" v-show="!running" @click="start_onclick") Start
		button.pause(v-show="running" @click="pause_onclick") Pause
		button.reset(:disabled="!started || running" @click="reset_onclick") Reset
		button.settings(:disabled="running" @click="settings_onclick")
			i.fa.fa-cog(aria-hidden="true")
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

		&.settings
			--bg-color: #f9f9f9
			--fg-color: #666

			flex-basis: 100px
			flex-grow: 0
			flex-shrink: 0

		&:disabled
			--bg-color: #fff
			--fg-color: #ccc

</style>

<script>
	module.exports = {
		props: [
			'started',
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

			settings_onclick(event) {
				this.onControl({ type: 'settings' })
			},
		},
	}
</script>
