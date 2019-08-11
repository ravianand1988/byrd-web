import api from '@/api'
import Vue from 'vue'

const state = {
  customers: [],
  currentCustomer: {
    customerId: null,
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10)
  }
}

const mutations = {
  SET_CUSTOMERS (state, customers) {
    state.customers = customers
  },
  SET_CURRENT_CUSTOMER (state, customer) {
    state.currentCustomer = customer
  }
}

const actions = {
  fetchCustomers (context) {
    return api.endpoints.customers()
      .then(response => {
        context.commit('SET_CUSTOMERS', response.data)
      })
      .catch(error => {
        Vue.notify({
          group: 'error',
          type: 'error',
          duration: 10000,
          title: 'Error',
          text: `There was a problem fetching customers. ${error}`
        })
      })
  },
  setCurrentCustomer (context, customer) {
    context.commit('SET_CURRENT_CUSTOMER', customer)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
