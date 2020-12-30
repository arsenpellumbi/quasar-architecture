import toastHelper, { ToastHelper } from '../core/helpers/ToastHelper';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $toast: ToastHelper;
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$toast = toastHelper;
});
