import { ApiEndpointsConfig, Configurations, I18nConfig } from './configurations.types';
import appsettings from 'src/appsettings.json';

export class ConfigurationsInstance implements Configurations {
  public title!: string;
  public initialRoutePath!: string;
  public endpoints!: ApiEndpointsConfig;
  public i18n!: I18nConfig;
  public debug!: boolean;

  constructor() {
    this.debug = process.env.NODE_ENV !== 'production';
    Object.keys(appsettings).forEach(key => {
      const property = Object.getOwnPropertyDescriptor(appsettings, key);
      this.loadConfiguration(key, property);
    });
  }

  private loadConfiguration(key: string, property?: PropertyDescriptor): void {
    if (property) Object.defineProperty(this, key, property);
  }
}
