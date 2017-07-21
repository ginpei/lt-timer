const Vue = require('vue')
const App = require('./components/App.vue')

new Vue({  // eslint-disable-line no-new
	el: '#app',
	render: f=>f(App),
})
