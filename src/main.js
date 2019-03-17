import Vue from 'vue'
import App from './App.vue'
import VueCookie from 'vue-cookie'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.use(VueCookie);
Vue.use(BootstrapVue);
Vue.use(VueResource);


Vue.http.options.root = 'http://127.0.0.1/prestashop1.6/modules/dialogflowchat/ajax.php';


var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { store } from './store/store'

library.add(faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})