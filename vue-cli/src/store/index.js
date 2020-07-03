import Vue from 'vue'
import Vuex from 'vuex'

// import { onLogin, onLogout } from '../vue-apollo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    homeItems: [],
    allowNestedComments: true,
    commentsOrder: 'last_activity',
    showLogin: false,
    user: null
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
    },
    updateHomeItems (state, payload) {
      state.homeItems = payload
    },
    updateCommentsOrder (state, payload) {
      state.commentsOrder = payload
    },
    toggleLogin (state, payload) {
      state.showLogin = payload
    },
    successfulLogin (state, payload) {
      // document.cookie = `jwt=${payload.jwt};path=/;max-age=${60 * 60 * 24 * 365}`
      // document.cookie = `jwt=${payload.jwt};path=/;max-age=${60 * 60 * 24 * 365};secure`

      // onLogin(apolloClient, payload.jwt)

      localStorage.setItem('jwt', payload.jwt)

      state.user = payload.user
      state.showLogin = false
    },
    logout (state) {
      // onLogout(apolloClient)

      localStorage.removeItem('jwt')

      state.user = null
    },
    updateUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      const formData = new FormData()
      formData.append('identifier', payload.identifier)
      formData.append('password', payload.password)

      fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (!data.jwt) {
            console.error(data)
            return
          }

          commit('successfulLogin', data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  modules: {
  }
})
