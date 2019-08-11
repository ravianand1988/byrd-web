import Vue from 'vue'
import Vuex from 'vuex'
import vueTestUtils from '@vue/test-utils'

import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueNotifications from 'vue-notification'

// ===
// Configure Vue
// ===

// Plugins
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueNotifications)

Vue.config.productionTip = false

// ===
// Mock window properties not handled by jsdom
// ===

Object.defineProperty(window, 'localStorage', {
  value: (function () {
    let store = {}
    return {
      getItem: function (key) {
        return store[key] || null
      },
      setItem: function (key, value) {
        store[key] = value.toString()
      },
      clear: function () {
        store = {}
      }
    }
  })()
})

// ===
// Global helpers
// ===

// https://vue-test-utils.vuejs.org/api/#mount
global.mount = vueTestUtils.mount

// https://vue-test-utils.vuejs.org/api/#shallowmount
global.shallowMount = vueTestUtils.shallowMount

// A helper for creating options object to be used for `mount` and `shallowMount`
// https://vue-test-utils.vuejs.org/api/options.html#context
global.mountingOptions = ({ store, router, style, mocks, stubs, ...other }) => {
  // Use a local version of Vue, to avoid polluting the global Vue and thereby affecting other tests.
  // https://vue-test-utils.vuejs.org/api/#createlocalvue
  const localVue = vueTestUtils.createLocalVue()
  const returnOptions = { localVue }

  // https://vue-test-utils.vuejs.org/api/options.html#stubs
  returnOptions.stubs = stubs || {}
  // https://vue-test-utils.vuejs.org/api/options.html#mocks
  returnOptions.mocks = mocks || {}

  // to a store instance, with each module namespaced by default, just like in our app.
  if (store) {
    localVue.use(Vuex)
    returnOptions.store = new Vuex.Store({
      modules: Object.keys(store)
        .map(moduleName => {
          const storeModule = store[moduleName]
          return {
            [moduleName]: {
              state: storeModule.state || {},
              mutations: storeModule.mutations || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced: typeof storeModule.namespaced === 'undefined' ? true : storeModule.namespaced
            }
          }
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {})
    })
  }

  // If using `router: true`, we'll automatically stub out components from Vue Router.
  if (router) {
    returnOptions.stubs['router-link'] = true
    returnOptions.stubs['router-view'] = true
    returnOptions.mocks.$router = { push: jest.fn(), replace: jest.fn() }
  }

  // If a `style` object is provided, mock some styles.
  if (style) {
    returnOptions.mocks.$style = style
  }

  return { ...returnOptions, ...other }
}
