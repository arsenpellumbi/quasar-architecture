import { Notify } from 'quasar';

export interface ToastHelper {
  success(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  info(message: string): void;
}

class ToastHelperInstance implements ToastHelper {
  public success(message: string): void {
    Notify.create({
      type: 'positive',
      message: message
    });
  }

  public error(message: string): void {
    Notify.create({
      type: 'negative',
      message: message
    });
  }

  public warning(message: string): void {
    Notify.create({
      type: 'warning',
      message: message
    });
  }

  public info(message: string): void {
    Notify.create({
      type: 'info',
      message: message
    });
  }
}

const toastHelper: ToastHelper = new ToastHelperInstance();
export default toastHelper;
