import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { boot } from 'quasar/wrappers';
import { ApiInterceptor, API_INTERCEPTOR } from '~/core/services/api/api-interceptors';
import { container } from '~/inversify.config';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default boot(({ app }) => {
  const apiInterceptor = container.get<ApiInterceptor>(API_INTERCEPTOR);

  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  };

  axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => await apiInterceptor.handleRequest(config),
    async (error: AxiosError) => await apiInterceptor.handleRequestError(error)
  );

  axios.interceptors.response.use(
    async (response: AxiosResponse) => await apiInterceptor.handleResponse(response),
    async (error: AxiosError) => await apiInterceptor.handleResponseError(error)
  );

  app.config.globalProperties.$axios = axios;
});
