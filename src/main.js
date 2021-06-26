import Vue from 'vue';
import App from './App';
import store from './store';
import Mock from './mock';
// import VConsole from 'vconsole';

if (process.env.NODE_ENV === 'development') {
  // let vConsole = new VConsole();
  // Vue.use(vConsole);
  // Vue.prototype.$vconsole = new VConsole();
}

const msg = (title, duration = 1500, mask = false, icon = 'none')=>{
  //统一提示方便全局修改
  if(Boolean(title) === false){
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon
  });
}

const prePage = ()=>{
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 2];
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;
}

// mock
const mock = type=>{
  //模拟异步请求数据
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(Mock[type]);
    }, 500);
  });
}

Vue.config.productionTip = false;
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, mock, prePage};

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
