import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import VueWindowSize from 'vue-window-size'
require('iframe-resizer/js/iframeResizer.contentWindow')
global.iFrameResizer = {
  heightCalculationMethod: 'taggedElement'
}

Vue.config.productionTip = false
Vue.use(VueWindowSize)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
