<template lang="pug">
	div
		h1 {{message}}
		p
			button(@click="onclick") Click me!
</template>

<style lang="sass">
	body
		text-align: center
</style>

<script>
	module.exports = {
		data() {
			return {
				on: false,
			};
		},

		computed: {
			message() {
				let message = 'Hello World!'
				if (this.on) {
					message = message.toUpperCase()
				}
				return message
			},
		},

		methods: {
			onclick(event) {
				this.on = !this.on
			},
		},
	}
</script>
