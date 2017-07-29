<template lang="pug">
	div
		button(:disabled="finished" v-show="!running" @click="start_onclick") Start
		button(v-show="running" @click="pause_onclick") Pause
		button(:disabled="running" @click="reset_onclick") Reset
</template>

<style lang="sass" scoped>
	div
		display: flex

	button
		flex-grow: 1
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
