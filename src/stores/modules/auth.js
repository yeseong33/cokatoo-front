// store/modules/auth.js
const state = {
  token: sessionStorage.getItem('jwt') || null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      sessionStorage.setItem('jwt', token)
    } else {
      sessionStorage.removeItem('jwt')
    }
  }
}

const actions = {
  login({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  logout({ commit }) {
    commit('SET_TOKEN', null)
  },
  initialize({ commit }) {
    const token = sessionStorage.getItem('jwt')
    commit('SET_TOKEN', token)
  }
}

const getters = {
  isAuthenticated(state) {
    return !!state.token
  },
  getToken(state) {
    return state.token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
