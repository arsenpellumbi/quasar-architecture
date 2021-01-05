import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import toastHelper from '../helpers/toast-helper';

async function handleRequest(store: Store<unknown>, config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  // const accessToken = appStoreProvider.authenticationStore.accessToken;
  // if (accessToken)
  //   config.headers.Authorization = `Bearer ${accessToken}`;

  return await Promise.resolve(config);
}

async function handleRequestError(error: AxiosError): Promise<never> {
  toastHelper.error('An error occured. Try again.');
  return await Promise.reject(error);
}

async function handleResponse(response: AxiosResponse): Promise<AxiosResponse> {
  return await Promise.resolve(response);
}

async function handleResponseError(router: VueRouter, error: AxiosError): Promise<never> {
  const errorResponse = error.response;

  if (errorResponse) {
    switch (errorResponse.status) {
      case 400:
        {
          const errorData = errorResponse.data as { errors: { DomainValidations: string[] } };
          if (errorData.errors) {
            const messages = errorData.errors.DomainValidations;
            if (messages) {
              messages.forEach((message: string) => {
                toastHelper.error(message);
              });
            } else toastHelper.error(errorResponse.data);
          } else toastHelper.error(errorResponse.data);
        }
        break;
      case 401:
        toastHelper.error(errorResponse.data);
        break;
      case 404:
        await router.replace({ name: '404' });
        break;
      default:
        toastHelper.error('An error occured. Try again.');
    }
  } else {
    toastHelper.error('An error occured. Try again.');
  }

  console.log(errorResponse ? errorResponse : error);
  return await Promise.reject(errorResponse ? errorResponse : error);
}

export default {
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError
};
