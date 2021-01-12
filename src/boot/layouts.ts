/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  const requireComponent = require.context('../layouts', false, /[\w-]+\.vue$/);

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));

    Vue.component(componentName, componentConfig.default || componentConfig);
  });
});
