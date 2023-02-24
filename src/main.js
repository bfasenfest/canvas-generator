// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Core App Imports
import Vue from 'vue'
import VueDraggable from 'vue-draggable'

import App from './App.vue';
import router from './router';
import store from './store/store';
import UUID from "vue-uuid";

// Outside frameworks/components
import VueResource from 'vue-resource';
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';
// import VueTippy from 'vue-tippy';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // Use this OR theme chalk in index.html
import locale from 'element-ui/lib/locale/lang/en';
// import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(UUID);
Vue.use(VueDraggable);
Vue.use(VueResource);
Vue.use(Snotify);
Vue.use(ElementUI, {
  locale
});
// Vue.use(VueTippy);
// Vue.use(CKEditor);

// Create Global methods
let GlobalMethods = {};
GlobalMethods.install = function (Vue, options) {
  Vue.jsonToArray = (json) => {
    let array = [];

    Object.values(json).forEach(row => {
      let last = (array.push([])) - 1;
      row.columns.forEach(column => {
        array[last].push(column.slots);
      });
    });
    return array;
  };

};

Vue.use(GlobalMethods);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  template: '<App/>',
  components: {
    App
  }
})
