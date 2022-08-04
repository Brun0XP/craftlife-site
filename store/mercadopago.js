export const state = () => ({
  mercadopago: null,
  cardToken: null,
  qrcode: null
})

export const getters = {
  async getPaymentMethod(state, payload) {
    return await state.mercadopago.getPaymentMethods(payload);
  },
  qrCode: state => state.qrcode,
  mercadopago: state => state.mercadopago,
}


export const mutations = {
  mutationMercadopago(state, payload) {
    state.mercadopago = payload;
  },
  mutationCardToken(state, payload) {
    state.cardToken = payload
  },
  mutationQRCode(state, payload) {
    state.qrcode = payload
  },
}

export const actions = {
  initMercadopago({ commit }, { $config }) {
    /* eslint-disable no-undef */
    commit('mutationMercadopago', new MercadoPago($config.mercadopagoPublicKey));
  },
  checkoutPix({ commit, dispatch}, payload) {
    dispatch('toggleLoading', true, { root: true });
    commit('mutationError', null, { root: true });
    this.$axios.post('/payments/pix', payload)
      .then(response => {
        commit('mutationQRCode', { value: response.data.qr_code, base64: response.data.qr_code_base64 });
        dispatch('toggleLoading', false, { root: true });
      }).catch(error => {
        commit('mutationError', error.response.data.message, { root: true });
        dispatch('toggleLoading', false, { root: true });
      })
  },
}