import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { storeConfig } from './store/store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store(storeConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
