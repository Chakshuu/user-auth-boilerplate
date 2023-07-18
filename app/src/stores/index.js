import Vue from 'vue';
import Vuex from 'vuex';
import { useApi, useApiPrivate } from '../composables/useApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
   user: {
    _id: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
   },
   accessToken: null,
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => state.user?._id ? true : false, 

  },
  mutations: {
    updateAccessToken(state, payload) {
      state.accessToken = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async attempt() {
      try {
        await this.dispatch('refresh');
        await this.dispatch('getUser');
      } catch(err) {
        console.log(err);
        return;
      }
    },

    async login(context, payload) {
      try {
        const res = await useApi().post('/api/auth/login', payload);
        context.commit('updateAccessToken', res.data?.access_token);
        await context.dispatch('getUser');
        return res.data;
      } catch (err) {
        throw err.response.data.message;
      }
    },

    async register(context, payload) {
      try {
        const res = await useApi().post('/api/auth/register', payload);
        return res.data;
      } catch (err) {
        throw err.response.data.message;
      }
    },

    async getUser(context) {
      try {
        const res = await useApiPrivate().get('/api/auth/user');
        context.commit('updateUser', res.data);
        return res.data;
      } catch (err) {
        throw err.response.data.message;
      }
    },

    async logout(context) {
      try {
        const res = await useApi().post('/api/auth/logout');
        context.commit('updateAccessToken', "");
        context.commit('updateUser', {});
        return res.data;
      } catch (err) {
        throw err.response.data.message;
      }
    },

    async refresh(context) {
      try {
        const res = await useApi().post('/api/auth/refresh');
        context.commit('updateAccessToken', res.data?.access_token);
        return res.data;
      } catch (err) {
        throw err.response.message;
      }
    }
  },
  modules: {},
});
