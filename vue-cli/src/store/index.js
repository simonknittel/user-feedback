import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    homeItems: [],
    userIsAdmin: true,
    allowNestedComments: true
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
