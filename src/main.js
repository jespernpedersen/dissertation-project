import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import storeConfig from './store/store'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC4rqOApbAiEdhTgHztvSORxwNpxgf5GN4',
    libraries: 'places',
  }
});

const store = new Vuex.Store(storeConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
