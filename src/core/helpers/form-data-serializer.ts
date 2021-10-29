/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class FormDataSerializer {
  static isUndefined = (value: any): boolean => value === undefined;
  static isNull = (value: any): boolean => value === null;
  static isBoolean = (value: any): boolean => typeof value === 'boolean';
  static isObject = (value: any): boolean => value === Object(value);
  static isArray = (value: any): boolean => Array.isArray(value);
  static isDate = (value: any): boolean => value instanceof Date;
  static isBlob = (value: any): boolean =>
    !!value && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.slice === 'function';

  static isFile = (value: any): boolean =>
    FormDataSerializer.isBlob(value) &&
    typeof value.name === 'string' &&
    (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number');

  static serialize = (object: any, config?: any, formData?: FormData, key?: string): FormData => {
    config = config || {};
    key = key || '';

    config.indices = FormDataSerializer.isUndefined(config.indices) ? true : config.indices;

    config.nullsAsUndefineds = FormDataSerializer.isUndefined(config.nullsAsUndefineds)
      ? false
      : config.nullsAsUndefineds;

    config.booleansAsIntegers = FormDataSerializer.isUndefined(config.booleansAsIntegers)
      ? false
      : config.booleansAsIntegers;

    config.allowEmptyArrays = FormDataSerializer.isUndefined(config.allowEmptyArrays) ? true : config.allowEmptyArrays;

    formData = formData || new FormData();

    if (FormDataSerializer.isUndefined(object)) {
      return formData;
    } else if (FormDataSerializer.isNull(object)) {
      if (!config.nullsAsUndefineds) {
        formData.append(key, '');
      }
    } else if (FormDataSerializer.isBoolean(object)) {
      if (config.booleansAsIntegers) {
        formData.append(key, object ? '1' : '0');
      } else {
        formData.append(key, object);
      }
    } else if (FormDataSerializer.isArray(object)) {
      if (object.length) {
        object.forEach((value: any, index: number) => {
          const porpertyKey = key + (config.indices ? '[' + index + ']' : '');
          FormDataSerializer.serialize(value, config, formData, porpertyKey);
        });
      } else if (config.allowEmptyArrays) {
        formData.append(key + (config.indices ? '[]' : ''), '');
      }
    } else if (FormDataSerializer.isDate(object)) {
      formData.append(key, object.toISOString());
    } else if (
      FormDataSerializer.isObject(object) &&
      !FormDataSerializer.isFile(object) &&
      !FormDataSerializer.isBlob(object)
    ) {
      Object.keys(object).forEach((prop) => {
        const value = object[prop];

        if (FormDataSerializer.isArray(value)) {
          while (prop.length > 2 && prop.endsWith('[]')) {
            prop = prop.substring(0, prop.length - 2);
          }
        }

        const porpertyKey = key ? key + '.' + prop : prop;

        FormDataSerializer.serialize(value, config, formData, porpertyKey);
      });
    } else {
      formData.append(key, object);
    }

    return formData;
  };
}
