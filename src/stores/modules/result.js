import {GradeAPI } from '@/api'

const state = {
  similarityScore: localStorage.getItem('similarityScore') || 0,
  grade: localStorage.getItem('grade') || null,
  gradeId: localStorage.getItem('gradeId') || null
}

const getters = {
  similarityScore: (state) => state.similarityScore,
  grade: (state) => state.grade,
  gradeId: (state) => state.gradeId,
}

const mutations = {
  SET_SIMILARITY_SCORE(state, similarityScore) {
    state.similarityScore = similarityScore
  },
  SET_GRADE(state, grade) {
    state.grade = grade
  }, 
  SET_GRADE_ID(state, gradeId) {
    state.gradeId = gradeId
  }
}

const actions = {
  async setSimilarityScore({ commit }, score) {
    commit('SET_SIMILARITY_SCORE', score)
    localStorage.setItem('similarityScore', score)
  },
  async getGrade({ commit, state }) {
    try {
      console.log(state.similarityScore)
      const response = await GradeAPI.evaluateGrade(state.similarityScore * 100)

      const grade = response.data.grade['tier']
      const gradeId = response.data.grade['gradeId']

      console.log("저장 되어야해 : ", grade, gradeId)

      commit('SET_GRADE_ID', gradeId)
      commit('SET_GRADE', grade)
      
      // 로컬스토리지에 grade와 gradeId 저장
      localStorage.setItem('grade', grade)
      localStorage.setItem('gradeId', gradeId)

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