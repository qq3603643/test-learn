import { ActionTree } from 'vuex'

const actions: ActionTree<any, any> = {
  _SET_NAME({ commit }, payload): void {
    commit('SET_NAME', payload)
  }
}

export default actions
