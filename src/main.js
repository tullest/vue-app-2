import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueApexCharts from 'vue-apexcharts'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueAwesomeCountdown from 'vue-awesome-countdown'

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)
Vue.use(vueAwesomeCountdown, 'vac')

Vue.component('apexchart', VueApexCharts)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
