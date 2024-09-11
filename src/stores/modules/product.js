const state = {
  products: []
  // 다른 상태들
}

const getters = {
  allProducts: (state) => state.products
  // 다른 게터들
}

const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      commit('SET_PRODUCTS', data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  // 다른 액션들
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
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
