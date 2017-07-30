<template lang="pug">
	Wrapper.wrapper(:running="running" :finishing="finishing" :aboutToFinish="aboutToFinish" :timeRest="timeRest")
		Timer.main(:time="timeRest")
		Controller.toolbar(:running="running" :finished="finished" :onControl="controller_onControl")
		.sounds
			audio(ref="audioAlert" src="static/D0002011516_00000_A_001.m4a")
			audio(ref="audioTimeup" src="static/D0002011522_00000_A_001.m4a")
</template>

<style lang="sass" scoped>
.wrapper
	display: grid
	grid-template-rows: auto 100px 0
	height: 100vh
	left: 0
	position: absolute
	top: 0
	width: 100vw

.main

.toolbar

.sounds
	overflow: hidden

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

		watch: {
			timeRest(newVal, oldVal) {
				if (oldVal > this.finishingAt && newVal <= this.finishingAt) {
					this.playAlert()
				}
				else if (oldVal > 0 && newVal <= 0) {
					this.playTimeup()
				}
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

				this.stopAlert()
				this.stopTimeup()
			},

			playAlert() {
				this.$refs.audioAlert.play()
			},

			stopAlert() {
				this.$refs.audioAlert.pause()
				this.$refs.audioAlert.currentTime = 0
			},

			playTimeup() {
				this.$refs.audioTimeup.play()
			},

			stopTimeup() {
				this.$refs.audioTimeup.pause()
				this.$refs.audioTimeup.currentTime = 0
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
