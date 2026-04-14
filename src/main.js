import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
window.Vue = Vue;

const app = new Vue({
  render: (h) => h(App)
})

app.$mount('#app')
