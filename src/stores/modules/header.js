const state = {
  navigation: [
    { name: '홈', href: '/', current: true },
    { name: '비교하기', href: '/record', current: false },
    { name: '기록', href: '/history', current: false }, // '기록'의 href를 변경해 중복 경로 문제 해결
    { name: '회원가입', herfL: '/signup', current: false },
    { name: '로그인', herfL: '/login', current: false },
    { name: '결과', herfL: '/result', current: false }
  ]
}

const mutations = {
  updateNavigation(state, name) {
    state.navigation.forEach((nav) => {
      nav.current = nav.name === name
    })
  }
}

const actions = {
  setNavigation({ commit }, name) {
    commit('updateNavigation', name)
  }
}

const getters = {
  navigation: (state) => state.navigation
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}