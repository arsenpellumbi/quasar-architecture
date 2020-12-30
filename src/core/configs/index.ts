/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nConfig } from './I18nConfig';
import { ApiEndpointsConfig } from './ApiEndpointsConfig';
import appsettings from '../../appsettings.json';

class Configurations {
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

  private loadConfiguration(key: string, property: any): void {
    Object.defineProperty(this, key, property);
  }
}

export default new Configurations();
