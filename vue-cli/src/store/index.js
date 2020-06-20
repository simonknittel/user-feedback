import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    homeItems: []
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
    },
    updateHomeItems (state, payload) {
      state.homeItems = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
