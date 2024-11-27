import { AuthAPI } from '@/api'

const state = {
  email: '',
  password: ''
}

const getters = {
  email: (state) => state.email,
  password: (state) => state.password
}

const actions = {
  updateEmail({ commit }, newEmail) {
    commit('SET_EMAIL', newEmail)
  },
  updatePassword({ commit }, newPassword) {
    commit('SET_PASSWORD', newPassword)
  },

  async handleAuthClick({ commit, state }) {
    const request = {
      email: state.email,
      password: state.password
    }
    try {
      const res = await AuthAPI.login(request)
      if (res.status == 200) {
        commit('RESET_STATE')
        alert('로그인 성공!')
      }
      return res
    } catch (error) {
      throw error
    }
  }
}

const mutations = {
  SET_EMAIL(state, newEmail) {
    state.email = newEmail
  },
  SET_PASSWORD(state, newPassword) {
    state.password = newPassword
  },
  RESET_STATE(state) {
    state.email = ''
    state.password = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
