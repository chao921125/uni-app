// import './static/pc';
import Vue from 'vue';
import App from './App';
import axios from './extend/uni-request-axios.js';
import store from './store';
import storage from './utils/set-storage.js';
// import cmdIcon from './components/cmd-icon.vue';
import jslinq from './extend/jslinq.js';
import uniUtils from './utils/uni-utils';
import tools from './utils/tools';
import titleBar from './components/title-bar.vue';
// import timeout from './components/timeout/timeout.vue';
import * as lodash from 'lodash';
import i18n from './extend/i18n';

// Vue.component('cmdIcon',cmdIcon)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.prototype.$jslinq = jslinq;
Vue.prototype.$uni = uniUtils;
Vue.prototype.$tools = tools;
Vue.prototype.$_ = lodash;
Vue.prototype.$storage = storage;
Vue.component('title-bar', titleBar);
// Vue.component('timeout', timeout);
Vue.prototype._i18n = i18n;

App.mpType = 'app';

const app = new Vue({
  ...App,
  i18n
});
app.$mount();
