export default {
	state: {
		count: 0
	},
	mutations: {
		ADD_COUNT(state)
		{
			state.count += 1;
		},
		SET_COUNT(state, order)
		{
			if(!order.hasOwnProperty('count'))
				order['count'] = state['count'];

			state.count = order.count;
		}
	},
	getters: {
		COUNT_GET: state => state.count
	},
	actions: {
		_ADD_COUNT: ({ commit }, order) => commit('ADD_COUNT'),
		_SET_COUNT: ({ commit }, order) => commit('SET_COUNT', order)
	},
	namespaced: !0
}