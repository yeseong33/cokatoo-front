const state = {
  similarityScore: 0
}

const mutations = {
  SET_SIMILARITY_SCORE(state, similarityScore) {
    state.similarityScore = similarityScore
  }
}

const actions = {
  setSimilarityScore({ commit }, score) {
    commit('SET_SIMILARITY_SCORE', score)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
