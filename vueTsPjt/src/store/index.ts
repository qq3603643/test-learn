import Vue from 'vue'
import Vuex, {
  ActionTree,
  MutationTree
} from 'vuex'
import actions from './modules/actions'
import mutations from './modules/mutation'
import getters from './modules/getters'

Vue.use(Vuex)

interface State {
  name: string,
  age: number,
  favorites: Array<any>
}

const state: State = {
  name: '',
  age: 0,
  favorites: []
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
