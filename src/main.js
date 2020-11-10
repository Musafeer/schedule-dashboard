import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from "axios";
import VuePhoneNumberInput from 'vue-phone-number-input';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
