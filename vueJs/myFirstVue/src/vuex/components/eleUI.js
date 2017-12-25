export default {
	state: {
		tit: 'some test about elementUI'
	},
	getters: {
		TIT_GET: state => state.tit
	},
	mutations: {
		SET_TIT(state, order)
		{
			state.tit = order.tit
		}
	},
	actions: {
		_SET_TIT: ({ commit }, order) => commit('SET_TIT', order)
	},
	namespaced: !0
}