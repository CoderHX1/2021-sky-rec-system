// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//axios.defaults.withCredentials=true;
Vue.use(ElementUI);


axios.defaults.baseURL = ""; // 关键步骤–填写后台请求统一的地址
axios.defaults.headers.post['Content-Type'] = ''; //设置全局数据发送格式
Vue.config.productionTip = false
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

