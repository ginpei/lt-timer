<template lang="pug">
	.timer
		h1 {{displayTime}}
</template>

<style lang="sass" scoped>
	.timer
		font-family: monospace
</style>

<script>
	module.exports = {
		props: [
			'time',
		],

		computed: {
			displayTime() {
				const all = Math.ceil(this.time / 1000)
				const minutes = Math.floor(all / 60)
				const seconds = all % 60
				const filledSeconds = (seconds < 10 ? '0' : '') + seconds
				return `${minutes}:${filledSeconds}`
			},
		},
	}
</script>
