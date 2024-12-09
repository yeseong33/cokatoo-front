const state = {
  sounds: []
}

const getters = {
  email: (state) => state.email,
  password: (state) => state.password
}

const actions = {
  async fetchSounds({ commit }) {
    try {
      const response = await SoundAPI.getAll()
      const data = await response.json()
      commit('SET_SOUNDS', data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
  getSounds({ commit }) {
    return commit.sounds
  }
}

const mutations = {
  SET_SOUNDS(state, sounds) {
    state.sounds = sounds
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
