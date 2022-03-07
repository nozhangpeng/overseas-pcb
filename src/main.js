import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import Mock from './mock'
Mock.bootstrap()
import 'font-awesome/css/font-awesome.min.css'
// Vue.config.productionTip = false

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// Directive
import directives from './directives'
Object.keys(directives).forEach((directiveName) => {
  Vue.directive(directiveName, directives[directiveName])
})

// Filter
import Filters from './filters'
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}


new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})
