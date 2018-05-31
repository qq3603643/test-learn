import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  SET_NAME(state, payload): void {
    state.name = payload
  }
}

export default mutations
