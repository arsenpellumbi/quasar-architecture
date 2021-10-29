/* eslint-disable @typescript-eslint/no-explicit-any */
import appsettings from '~/app.settings.json';
import { interfaces } from 'inversify';
import { provide } from '~/inversify.config';

interface ProjectManagerApiConfig {
  baseUrl: string;
}

interface ApiEndpointsConfig {
  projectManagerApi: ProjectManagerApiConfig;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
}

interface IdentityConfig {
  authority: string;
  clientId: string;
  clientSecret: string;
  responseType: string;
  filterProtocolClaims: boolean;
  scope: string;
  automaticSilentRenew: boolean;
  redirectUri: string;
  postLogoutRedirectUri: string;
  silentRedirectUri: string;
}

export const CONFIGURATIONS: interfaces.ServiceIdentifier<Configurations> = 'CONFIGURATIONS';

@provide<Configurations>(CONFIGURATIONS, true)
export class Configurations {
  public title!: string;
  public initialRoutePath!: string;
  public endpoints!: ApiEndpointsConfig;
  public identity!: IdentityConfig;
  public i18n!: I18nConfig;
  public debug!: boolean;

  constructor() {
    this.debug = process.env.NODE_ENV !== 'production';
    Object.keys(appsettings).forEach((key) => {
      const property = Object.getOwnPropertyDescriptor(appsettings, key);
      if (property) this.loadConfiguration(key, property);
    });
  }

  private loadConfiguration(key: string, property: PropertyDescriptor): void {
    property.value = this.getEnvironmentVariable('', key, property);
    Object.defineProperty(this, key, property);
  }

  private getEnvironmentVariable(parentKey: string, key: string, property: PropertyDescriptor): any {
    if (this.isObject(property.value)) {
      Object.keys(property.value).forEach((innerKey) => {
        const innerProp = Object.getOwnPropertyDescriptor(property.value, innerKey);
        if (innerProp) {
          innerProp.value = this.getEnvironmentVariable(parentKey ? `${parentKey}__${key}` : key, innerKey, innerProp);
          Object.defineProperty(property.value, innerKey, innerProp);
        }
      });
      return property.value;
    }

    let envKey = parentKey ? `${parentKey}__${key}` : key;

    if (!envKey.startsWith('VUE_APP')) envKey = `VUE_APP__${envKey}`;

    return (window as any)?.configs?.[envKey] || property.value;
  }

  private isObject = (value: any): boolean => value === Object(value);
}
