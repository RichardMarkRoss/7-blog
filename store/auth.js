export const state = () => ({
    token: null
  })
  
  export const mutations = {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    }
  }
  
  export const actions = {
    async nuxtServerInit({ dispatch }) {
      
    },
    logout({ commit }) {
      commit('clearToken');
    }
  }
  
  export const getters = {
    isAuthenticated(state) {
      return !!state.token;
    }
  }
  