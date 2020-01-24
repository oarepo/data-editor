import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import DataEditor from '@oarepo/data-editor'
import DataRenderer from '@oarepo/data-renderer'

Vue.config.productionTip = false
Vue.use(DataEditor, {})
Vue.use(DataRenderer, {})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
