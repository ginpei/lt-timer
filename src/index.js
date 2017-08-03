const Vue = require('vue')
const App = require('./App.vue')
const router = require('./router.js');

new Vue({  // eslint-disable-line no-new
	el: '#app',
	router,
	render: f=>f(App),
})
