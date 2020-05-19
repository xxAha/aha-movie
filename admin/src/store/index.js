import Vue from 'vue'
import Vuex from 'vuex'
import { getOwnerInfoAPI } from '../api/user'
import { getSettingAPI } from '../api/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ownerInfo: null,
    setting: null
  },
  actions: {
    async getOwnerInfoAct(ctx) {
      const result = await getOwnerInfoAPI()
      ctx.commit('saveOwnerInfoMut', result.data)
    },
    async getSettingAct(ctx) {
      const result = await getSettingAPI()
      ctx.commit('saveSettingMut', result.data)
    }
  },
  mutations: {
    saveOwnerInfoMut(state, data) {
      state.ownerInfo = data
    },
    saveSettingMut(state, data) {
      state.setting = data
    }
  }
})
