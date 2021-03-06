import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import actions from './actions'
import mutations from './mutations'
import state from './state'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {},
  plugins: [vuexLocal.plugin]
})
