import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { boot } from 'quasar/wrappers';
import apiInterceptors from '../core/api/ApiInterceptors';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ router, store, Vue }) => {
  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  };

  axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => await apiInterceptors.handleRequest(store, config),
    async (error: AxiosError) => await apiInterceptors.handleRequestError(error)
  );

  axios.interceptors.response.use(
    async (response: AxiosResponse) => await apiInterceptors.handleResponse(response),
    async (error: AxiosError) => await apiInterceptors.handleResponseError(router, error)
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
});
