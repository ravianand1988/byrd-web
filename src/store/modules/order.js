import api from '@/api'
import Vue from 'vue'

const state = {
  orders: []
}

const mutations = {
  SET_ORDERS (state, orders) {
    state.orders = orders
  }
}

const actions = {
  fetchOrders ({ commit, dispatch, state }, { customerId, params }) {
    return api.endpoints.orders(customerId, params)
      .then(response => {
        commit('SET_ORDERS', response.data)
        Vue.notify({
          group: 'error',
          title: 'Success',
          type: 'success',
          duration: 10000,
          text: 'Orders fetched successfully.'
        })
      })
      .catch(error => {
        Vue.notify({
          group: 'error',
          type: 'error',
          duration: 10000,
          title: 'Error',
          text: `There was a problem fetching orders. ${error}`
        })
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
