import Vue from 'vue';
import Vuex from 'vuex';
import Count from './components/count';
import Ele from './components/eleUI';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Count,
		Ele
	}
})