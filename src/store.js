const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		time: {
			namespaced: true,

			state: {
				aboutToFinishAt: 10000,  // 10 sec
				allottedTime: 300000,  // 5 min
				finishingAt: 60000,  // 1 min
			},

			getters: {
			},

			mutations: {
				SET_ALLOTED_TIME(state, payload) {
					state.allottedTime = payload
				},

				SET_FINISHING_AT(state, payload) {
					state.finishingAt = payload
				},
			},

			actions: {
				setAllotedTime({ commit }, payload) {
					commit('SET_ALLOTED_TIME', payload)
				},

				setFinishingAt({ commit }, payload) {
					commit('SET_FINISHING_AT', payload)
				},
			},
		},
	},
});
