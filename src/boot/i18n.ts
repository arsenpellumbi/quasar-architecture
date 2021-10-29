import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from '~/core/locales';

const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
