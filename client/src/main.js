import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { extend } from 'vee-validate'
import { required, regex } from 'vee-validate/dist/rules'
import './sass/index.sass'

Vue.config.productionTip = false

extend('required', {
  ...required,
  message: 'Merci de renseigner ce champ'
})

extend('link', {
  ...regex,
  message: 'Lien non valide'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
