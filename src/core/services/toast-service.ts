import { Notify } from 'quasar';
import { interfaces } from 'inversify';
import { provide } from '~/inversify.config';

export const TOAST_SERVICE: interfaces.ServiceIdentifier<ToastService> = 'TOAST_SERVICE';

@provide<ToastService>(TOAST_SERVICE)
export class ToastService {
  public success(message: string): void {
    Notify.create({
      type: 'positive',
      message: message,
    });
  }

  public error(message: string): void {
    Notify.create({
      type: 'negative',
      message: message,
    });
  }

  public warning(message: string): void {
    Notify.create({
      type: 'warning',
      message: message,
    });
  }

  public info(message: string): void {
    Notify.create({
      type: 'info',
      message: message,
    });
  }
}
