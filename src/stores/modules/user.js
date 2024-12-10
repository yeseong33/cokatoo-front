import { UserAPI } from '@/api'

const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
}

const getters = {
  isAuthenticated: (state) => !!state.userInfo,
  userInfo: (state) => state.userInfo
}

const actions = {
  async fetchUserInfo({ commit }) {
    try {
      const data = await UserAPI.getUserByJwt()
      commit('SET_USER_INFO', data)

      // 사용자 정보 저장
      localStorage.setItem('userInfo', JSON.stringify(data))
      console.log('조회 결과', data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
