// Mocks all files ending in `.vue` showing them as plain Vue instances
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.json' {
  const value: any;
  export default value;
}

//types
type Guid = (string & { _isGuid: true }) | null | undefined;