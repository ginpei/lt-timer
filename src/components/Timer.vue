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
				return Math.floor(this.time / 1000)
			},
		},
	}
</script>
