import { CompareSoundAPI, GradeAPI } from '@/api'

const state = {
  similarityScore: 0,
  grade: null
}

const mutations = {
  SET_SIMILARITY_SCORE(state, similarityScore) {
    state.similarityScore = similarityScore
  },
  SET_GRADE(state, grade) {
    state.grade = grade
  }
}

const actions = {
  async setSimilarityScore({ commit }, score) {
    commit('SET_SIMILARITY_SCORE', score)
  },
  async getGrade({ commit, state }) {
    try {
      console.log(state.similarityScore)
      const response = await GradeAPI.evaluateGrade(state.similarityScore * 100)

      const gradeId = response.data.grade['tier']
      commit('SET_GRADE', gradeId)
      return gradeId
    } catch (error) {
      console.log('유사도 저장 실패:', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
