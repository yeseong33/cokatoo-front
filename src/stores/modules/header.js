const state = {
  navigation: [
    { name: '홈', href: '/', current: true },
    { name: '비교하기', href: '/record', current: false },
    { name: '회원가입', href: '/signup', current: false },
    { name: '로그인', href: '/login', current: false }
  ]
}

const mutations = {
  updateNavigation(state, name) {
    state.navigation.forEach((nav) => {
      nav.current = nav.name === name
    })
  },
  addRecord(state) {
    state.navigation.splice(2, 0, { name: '기록', href: '/history', current: false })
  }
}

const actions = {
  setNavigation({ commit }, name) {
    commit('updateNavigation', name)
  },

  addRecord({commit}){
    commit('addRecord')
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
