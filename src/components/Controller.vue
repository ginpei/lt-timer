<template lang="pug">
	div
		button(:disabled="finished" v-show="!running" @click="start_onclick") Start
		button(v-show="running" @click="pause_onclick") Pause
		button(:disabled="running" @click="reset_onclick") Reset
</template>

<style lang="sass" scoped>
	button
		height: 100px
		width: 100px
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
