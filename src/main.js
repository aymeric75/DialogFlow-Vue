import Vue from 'vue'
import App from './App.vue'
import VueCookie from 'vue-cookie'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import JQuery from 'jquery'
var $ = JQuery

Vue.use(VueCookie);
Vue.use(BootstrapVue);
Vue.use(VueResource);


var href = window.location.href;
href = href.replace(/\/[a-z]{2}\//,'/')
var dir = href.substring(0, href.lastIndexOf('/')) + "/modules/dialogflowchat/ajax.php";

Vue.http.options.root = dir;

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