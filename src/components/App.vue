<template lang="pug">
	Wrapper.wrapper(:running="running" :finishing="finishing" :aboutToFinish="aboutToFinish" :timeRest="timeRest")
		Timer.main(:time="timeRest")
		Controller.toolbar(:running="running" :finished="finished" :onControl="controller_onControl")
</template>

<style lang="sass" scoped>
.wrapper
	display: grid
	grid-template-rows: auto 100px
	height: 100vh
	left: 0
	position: absolute
	top: 0
	width: 100vw

.main

.toolbar

</style>

<script>
	const Controller = require('./Controller.vue')
	const Timer = require('./Timer.vue')
	const Wrapper = require('./Wrapper.vue')

	module.exports = {
		components: {
			Controller,
			Timer,
			Wrapper,
		},

		data() {
			return {
				aboutToFinishAt: 10000,  // 10sec
				allottedTime: 300000,  // 5 min
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
