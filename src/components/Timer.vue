<template lang="pug">
	.timer
		h1
			span(ref="text" :style="styles") {{displayTime}}
</template>

<style lang="sass" scoped>
	.timer
		font-family: monospace

	h1
		height: 100%
		margin: 0
		text-align: center

		&::before
			content: ""
			display: inline-block
			height: 100%
			vertical-align: middle
			width: 0

		span
			display: inline-block

</style>

<script>
	module.exports = {
		props: [
			'time',
		],

		data() {
			return {
				f_resize: null,
				scale: 1,
			};
		},

		mounted() {
			this.f_resize = () => this.updateScale()
			window.addEventListener('resize', this.f_resize)
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.f_resize)
			this.f_resize = null
		},

		watch: {
			time(newVal, oldVal) {
				if (this.displayTime !== this.timeToDisplay(oldVal)) {
					this.updateScale()
				}
			},
		},

		computed: {
			displayTime() {
				return this.timeToDisplay(this.time)
			},

			styles() {
				return {
					transform: `scale(${this.scale})`,
				}
			},
		},

		methods: {
			timeToDisplay(time) {
				const all = Math.ceil(time / 1000)
				const minutes = Math.floor(all / 60)
				const seconds = all % 60
				const filledSeconds = (seconds < 10 ? '0' : '') + seconds
				return `${minutes}:${filledSeconds}`
			},

			updateScale() {
				const elContainer = this.$el
				const cw = elContainer.clientWidth
				const ch = elContainer.clientHeight

				const elText = this.$refs.text
				const tw = elText.clientWidth
				const th = elText.clientHeight

				this.scale = Math.min(cw / tw, ch / th) * 0.95
				console.debug(cw, tw, ch, th, this.scale);
			},
		},
	}
</script>
