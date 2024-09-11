import { AuthAPI, SoundAPI } from '@/api'

const state = {
  sounds: [],
  sound: null,
  id: -1
}

const getters = {
  getAllSound: (state) => state.sounds,
  currentSoundId: (state) => state.id
}
const actions = {
  async fetchSounds({ commit }) {
    try {
      const response = await SoundAPI.getAll()
      const data = await response.data.sounds
      commit('SET_SOUNDS', data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
  async getSound({ commit }, soundId) {
    try {
      const response = await SoundAPI.getSound(soundId)
      const data = await response.data
      console.log('음원 데이터를 Vuex에 저장합니다:', data)
      commit('SET_SOUND', data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
  async setSoundId({ commit }, soundId) {
    commit('SET_SOUNDID', soundId)
  }

  // 다른 액션들
}

const mutations = {
  SET_SOUNDS(state, sounds) {
    state.sounds = sounds
  },
  SET_SOUND(state, sound) {
    console.log('SET_SOUND mutation:', sound)
    state.sound = sound
  },
  SET_SOUNDID(state, id) {
    state.id = id
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
