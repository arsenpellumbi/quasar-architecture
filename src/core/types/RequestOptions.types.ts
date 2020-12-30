import { AxiosRequestConfig } from 'axios';
import { RequestMethod } from '../enums';

export interface RequestOptions extends AxiosRequestConfig {
  method: RequestMethod;
  url: string;
  data?: unknown;
  loading?: boolean;
}
