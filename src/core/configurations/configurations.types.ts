interface ProjectManagerApiConfig {
  baseUrl: string;
}

export interface ApiEndpointsConfig {
  projectManagerApi: ProjectManagerApiConfig;
}

export interface I18nConfig {
  locale: string;
  fallbackLocale: string;
}

export interface Configurations {
  title: string;
  initialRoutePath: string;
  endpoints: ApiEndpointsConfig;
  i18n: I18nConfig;
  debug: boolean;
}
