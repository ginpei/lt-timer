<template lang="pug">
	div
		Timer(:time="timeRest")
		Controller(:running="running" :onControl="controller_onControl")
</template>

<style lang="sass">
</style>

<script>
	const Controller = require('./Controller.vue')
	const Timer = require('./Timer.vue')

	module.exports = {
		components: {
			Controller,
			Timer,
		},

		data() {
			return {
				allottedTime: 300000,  // 5 min
				running: false,
				tickedAt: null,
				time: 0,
				tmTimer: null,
			};
		},

		computed: {
			timeRest() {
				return this.allottedTime - this.time
			},
		},

		methods: {
			start() {
				this.tickedAt = Date.now()
				this.updateTime()
				this.running = true
			},

			updateTime() {
				const now = Date.now()
				this.time += now - this.tickedAt
				this.tickedAt = now

				if (this.time >= this.allottedTime) {
					this.time = 0
					this.pause()
				}
				else {
					this.tmTimer = window.requestAnimationFrame(()=>{
						this.updateTime()
					});
				}
			},

			stopUpdatingTime() {
				window.cancelAnimationFrame(this.tmTimer)
				this.tmTimer = null
			},

			pause() {
				this.tickedAt = null
				this.stopUpdatingTime()
				this.running = false
			},

			reset() {
				this.pause()
				this.time = 0
			},

			controller_onControl({type}) {
				if (type === 'start') {
					this.start()
				}
				else if (type === 'pause') {
					this.pause()
				}
				else if (type === 'reset') {
					this.reset()
				}
			},
		},
	}
</script>
