import { SignupAPI } from '@/api'

const state = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

const getters = {
  name: (state) => state.name,
  email: (state) => state.email,
  password: (state) => state.password,
  passwordConfirm: (state) => state.passwordConfirm
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
  async handleJoinClick({ state }) {
    if (state.password !== state.passwordConfirm) {
      alert('비밀번호를 확인해주세요.')
      return
    }

    const request = {
      name: state.name,
      email: state.email,
      password: state.password
    }

    try {
      const res = await SignupAPI.sign(request)
      return res
    } catch (error) {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
