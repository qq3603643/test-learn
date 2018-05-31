import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  name(state): string {
    return state.name
  }
}

export default getters
