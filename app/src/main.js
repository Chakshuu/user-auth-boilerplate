import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores';
import { authentication } from './plugins/authentication';

import 'bootstrap/dist/css/bootstrap.css';

authentication.install().then(() =>{ 
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
});
