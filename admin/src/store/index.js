import Vue from 'vue'
import Vuex from 'vuex'
import { getOwnerInfoAPI } from '../api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ownerInfo: null
  },
  actions: {
    async getOwnerInfoAct(ctx) {
      const result = await getOwnerInfoAPI()
      ctx.commit('saveOwnerInfoMut', result.data)
    }
  },
  mutations: {
    saveOwnerInfoMut(state, info) {
      state.ownerInfo = info
    }
  }
})
