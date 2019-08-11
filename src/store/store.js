import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import customer from './modules/customer'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    customer,
    order
  },
  plugins: [createPersistedState()],
  state: {},
  getters: {},
  actions: {},
  mutations: {}
})

if (module.hot) {
  module.hot.accept([
    './modules/customer',
    './modules/order'
  ], () => {
    store.hotUpdate({
      modules: {
        customer: require('./modules/customer').default,
        order: require('./modules/order').default
      }
    })
  })
}

export default store
