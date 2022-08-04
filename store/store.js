export const state = () => ({
  account: false,
  listing: [],
  shoppingCart: [],
})

export const getters = {
  account: state => state.account,
  listing: state => state.listing,
  shoppingCart: state => state.shoppingCart,
}

export const mutations = {
  SET_ACCOUNT(state, payload) {
    state.account = payload;
  },
  SET_LISTING(state, payload) {
    state.listing = payload;
  },
  SET_SHOPPING_CART(state, payload) {
    console.log(payload)
    state.shoppingCart = payload;
  }
}

export const actions = {
  changeAccount({ commit }, payload) {
    commit('SET_ACCOUNT', payload);
  },
  fetchListing({ commit }) {
    this.$axios.get('/product').then(response => {
      commit('SET_LISTING', response.data);
    });
  },
  addToCart({ commit, getters}, payload) {
    commit('SET_SHOPPING_CART', [...getters.shoppingCart, payload]);
    this.$router.push('/checkout/basket')
  },
  removeFromCart({ commit, getters }, payload) {
    commit('SET_SHOPPING_CART', getters.shoppingCart.filter(item => item.id !== payload));
  },
}