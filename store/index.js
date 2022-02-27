export const state = () => ({
  error: null,
  loading: false,
})

export const mutations = {
  mutationError(state, payload) {
    state.error = payload;
  },
  mutationLoading(state, payload) {
    state.loading = payload;
  },
}

export const actions = {
  toggleLoading({ commit }, payload) {
    commit('mutationLoading', payload);
  }
}

export const getters = {
  error: state => state.error,
  loading: state => state.loading,
}
