/* eslint-disable no-undef */
import Vue from 'vue';
// import { routelist } from '../utils/route-list';
// import { codeList } from '../../constant.config';
import Stro from '../utils/set-storage';
import { login } from '@/extend/uni-api.js';
const viewBase = Vue.extend({
  data: () => ({
    isIpx: getApp().globalData.isIpx
  }),
  onLoad() {
    login().then(res => {
      return this.$axios.post({
        url: '/wx/check',
        data: {
          code: res.code
        }
      });
    }).then(res => {
      if (res && (res.code === '0' || res.code === 0)) {
        this.$store.dispatch('loginId', res.data);
        // isUpd为1时代表有用户信息，为2时代表无用户信息
        if (process.env.NODE_ENV === 'development' && !Stro.getItem('codeMall')) {
          return uni.reLaunch({ url: '/pages/login/check-code' });
        }
        if (res.data.isUpd === 2) {
          return uni.redirectTo({
            url: '/pages/login/login'
          });
        }
        this.pageInit();
        return;
      }
      this.$uni.showToast(res.message);
      // this.$store.dispatch('loginId', res);
      // isUpd为1时代表有用户信息，为2时代表无用户信息
      // if (!Stro.getItem('codeMall')) {
      //   return uni.reLaunch({ url: '/pages/login/check-code' });
      // }
      // if (res.isUpd === 2) {
      //   return uni.navigateTo({
      //     url: '/pages/login/login'
      //   });
      // }
      // this.pageInit();
    });
  },
  methods: {}
});
export default viewBase;
