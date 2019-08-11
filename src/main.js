import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import api from './api'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  api,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
