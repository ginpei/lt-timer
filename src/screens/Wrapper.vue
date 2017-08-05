<template lang="pug">
	.wrapper(:class="classes")
		slot
</template>

<style lang="sass" scoped>
	.wrapper
		&.flashing
			background-color: #f00
			color: #fff
</style>

<script>
	module.exports = {
		props: [
			'aboutToFinish',
			'finishing',
			'timeRest',
		],

		computed: {
			classes() {
				return {
					flashing: this.aboutToFinish ? this.halfUpSecond : this.finishing,
				}
			},

			halfUpSecond() {
				return Math.ceil(this.timeRest / 500) % 2 === 0
			},
		},
	}
</script>
