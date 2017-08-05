const Home = require('./screens/Index.vue');
const Settings = require('./screens/settings/Index.vue');
const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

module.exports = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/settings/', component: Settings },
	],
});
