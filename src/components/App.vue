<template lang="pug">
	div
		Timer(:time="timeRest")
		Controller(:running="running" :finished="finished" :onControl="controller_onControl")
		p
			input(:checked="finishing" type="radio" disabled)
			| Finishing
			br
			input(:checked="aboutToFinish" type="radio" disabled)
			| About to finish
			br
			input(:checked="finished" type="radio" disabled)
			| Finished
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
				aboutToFinishAt: 10000,  // 10sec
				allottedTime: 30000,  // 5 min
				finishingAt: 60000,  // 60sec
				running: false,
				tickedAt: null,
				time: 0,
				tmTimer: null,
			};
		},

		computed: {
			aboutToFinish() {
				return this.timeRest < this.aboutToFinishAt
			},

			timeRest() {
				return Math.max(this.allottedTime - this.time, 0)
			},

			finishing() {
				return this.timeRest < this.finishingAt
			},

			finished() {
				return this.timeRest <= 0
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
