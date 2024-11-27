import { SignupAPI } from '@/api'

const state = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null
}

const getters = {
  name: (state) => state.name,
  email: (state) => state.email,
  password: (state) => state.password,
  passwordConfirm: (state) => state.passwordConfirm,
  error: (state) => state.error
}

const actions = {
  updateName({ commit }, newName) {
    commit('SET_NAME', newName)
  },
  updateEmail({ commit }, newEmail) {
    commit('SET_EMAIL', newEmail)
  },
  updatePassword({ commit }, newPassword) {
    commit('SET_PASSWORD', newPassword)
  },
  updatePasswordConfirm({ commit }, newPasswordConfirm) {
    commit('SET_PASSWORD_CONFIRM', newPasswordConfirm)
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  joinCondition({ state }) {
    if (state.password !== state.passwordConfirm) {
      alert('비밀번호를 확인해주세요.')
      return true
    }
    return false
  },
  makeRequest({ state }) {
    return {
      name: state.name,
      email: state.email,
      password: state.password
    }
  },
  async handleJoinClick({ commit, state }) {
    if (actions.joinCondition({ state })) return
    const request = actions.makeRequest({ state })
    try {
      const res = await SignupAPI.sign(request)
      commit('RESET_STATE')
      return res
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Signup failed')
      alert(error.response?.data?.message)
      console.error('회원가입 실패:', error)

      throw error
    }
  }
}

const mutations = {
  SET_NAME(state, newName) {
    state.name = newName
  },
  SET_EMAIL(state, newEmail) {
    state.email = newEmail
  },
  SET_PASSWORD(state, newPassword) {
    state.password = newPassword
  },
  SET_PASSWORD_CONFIRM(state, newPasswordConfirm) {
    state.passwordConfirm = newPasswordConfirm
  },
  RESET_STATE(state) {
    state.name = ''
    state.email = ''
    state.password = ''
    state.passwordConfirm = ''
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
