import Vue from 'vue'
import App from './App'
import PLoading from './components/PLoading.vue'

Vue.config.productionTip = false
Vue.component('p-loading', PLoading)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
