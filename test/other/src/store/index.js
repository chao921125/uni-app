'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login: undefined,
    openId: undefined,
    sessionKey: undefined,
    authorization: undefined,
    isPhone: undefined,
    isUpd: undefined,
    vip: undefined,
    appid: 'wx81aac53adfaf4e69',
    id: undefined,
    unionid: ''
  },
  getters: {
    authorization: state => {
      return state.authorization;
    },
    openId: state => {
      return state.openId;
    },
    unionid: state => {
      return state.unionid;
    },
    sessionKey: state => {
      return state.sessionKey;
    },
    appid: state => {
      return state.appid;
    },
    isPhone: state => {
      return state.isPhone;
    },
    isUpd: state => {
      return state.isUpd;
    },
    vip: state => {
      return state.vip;
    },
    id: state => {
      return state.id;
    },
    login: state => {
      return state.login;
    }
  },
  mutations: {
    loginId(state, data) {
      state.login = data;
      state.openId = data.openId;
      state.unionid = data.unionid;
      state.sessionKey = data.sessionKey;
      state.authorization = data.authorization;
      state.isPhone = data.isPhone;
      state.isUpd = data.isUpd;
      state.vip = data.vip;
      state.id = data.id;
    }
  },
  actions: {
    loginId({ commit }, data) {
      commit('loginId', data);
    }
  }
});

export default store;
