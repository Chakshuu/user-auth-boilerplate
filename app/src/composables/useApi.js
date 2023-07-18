import { watchEffect } from 'vue';
import { axiosInstance, axiosPrivateInstance } from '../utils/axios';
import store from '../stores'

export function useApiPrivate() {
  const self = this;
  watchEffect(() => {
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${store.state.accessToken}`; 
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  
    axiosPrivateInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
  
        if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest.sent) {
          prevRequest.sent = true;
          await store.dispatch('refresh');
          prevRequest.headers['Authorization'] = store.state.accessToken;
          return axiosPrivateInstance(prevRequest);
        }
  
        return Promise.reject(error);
      }
    );
  })

  return axiosPrivateInstance;
}

export function useApi() {
  return axiosInstance;
}
