import { UserAPI } from '@/api'

const state = {
  userInfo: null
  // 다른 상태들
}

const getters = {
  isAuthenticated: (state) => !!state.userInfo,
  userInfo: (state) => state.userInfo
  // 다른 게터들
}

const actions = {
  async fetchUserInfo({ commit }) {
    try {
      const data = await UserAPI.getUserByJwt()
      commit('SET_USER_INFO', data)
      console.log('조회 결과', data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
  // 다른 액션들
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
  // 다른 변이들
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
