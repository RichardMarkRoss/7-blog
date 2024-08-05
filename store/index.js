import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    }
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token)
      localStorage.setItem('token', token)
    },
    logout({ commit }) {
      commit('clearToken')
      localStorage.removeItem('token')
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    }
  }
})
