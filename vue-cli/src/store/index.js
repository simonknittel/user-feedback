import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    itemTypes: [],
    items: []
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
    },
    updateItemTypes (state, payload) {
      state.itemTypes = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
