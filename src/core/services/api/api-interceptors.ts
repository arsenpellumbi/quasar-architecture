import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { provide } from '~/inversify.config';
import { inject, interfaces } from 'inversify';
import { AppRouter, APP_ROUTER } from '~/router/app.routing';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/modules/authentication/core/store/authentication-store';
import { ToastService, TOAST_SERVICE } from '../toast-service';

export const API_INTERCEPTOR: interfaces.ServiceIdentifier<ApiInterceptor> = 'API_INTERCEPTOR';

@provide<ApiInterceptor>(API_INTERCEPTOR)
export class ApiInterceptor {
  private readonly _appRouter: AppRouter;
  private readonly _toast: ToastService;
  private readonly _authenticationStore: AuthenticationStore;

  constructor(
    @inject(APP_ROUTER) appRouter: AppRouter,
    @inject(TOAST_SERVICE) toastService: ToastService,
    @inject(AUTHENTICATION_STORE) authenticationStore: AuthenticationStore
  ) {
    this._appRouter = appRouter;
    this._toast = toastService;
    this._authenticationStore = authenticationStore;
  }

  async handleRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const accessToken = this._authenticationStore.user?.authToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return await Promise.resolve(config);
  }

  async handleRequestError(error: AxiosError): Promise<never> {
    this._toast.error('An error occured. Try again.');
    return await Promise.reject(error);
  }

  async handleResponse(response: AxiosResponse): Promise<AxiosResponse> {
    return await Promise.resolve(response);
  }

  async handleResponseError(error: AxiosError): Promise<never> {
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
                  this._toast.error(message);
                });
              } else this._toast.error(errorResponse.data);
            } else this._toast.error(errorResponse.data);
          }
          break;
        case 401:
          this._toast.error(errorResponse.data);
          break;
        case 404:
          await this._appRouter.router.push({ name: '404' });
          break;
        default:
          this._toast.error('An error occured. Try again.');
      }
    } else {
      this._toast.error('An error occured. Try again.');
    }

    console.log(errorResponse ? errorResponse : error);
    return await Promise.reject(errorResponse ? errorResponse : error);
  }
}
