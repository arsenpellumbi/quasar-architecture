/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
class FormDataSerializer {
  isUndefined = (value: any): boolean => value === undefined;
  isNull = (value: any): boolean => value === null;
  isBoolean = (value: any): boolean => typeof value === 'boolean';
  isObject = (value: any): boolean => value === Object(value);
  isArray = (value: any): boolean => Array.isArray(value);
  isDate = (value: any): boolean => value instanceof Date;
  isBlob = (value: any): boolean =>
    value && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.slice === 'function';

  isFile = (value: any): boolean =>
    this.isBlob(value) &&
    typeof value.name === 'string' &&
    (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number');

  serialize = (object: any, config?: any, formData?: FormData, key?: string): FormData => {
    config = config || {};
    key = key || '';

    config.indices = this.isUndefined(config.indices) ? true : config.indices;

    config.nullsAsUndefineds = this.isUndefined(config.nullsAsUndefineds) ? false : config.nullsAsUndefineds;

    config.booleansAsIntegers = this.isUndefined(config.booleansAsIntegers) ? false : config.booleansAsIntegers;

    config.allowEmptyArrays = this.isUndefined(config.allowEmptyArrays) ? true : config.allowEmptyArrays;

    formData = formData || new FormData();

    if (this.isUndefined(object)) {
      return formData;
    } else if (this.isNull(object)) {
      if (!config.nullsAsUndefineds) {
        formData.append(key, '');
      }
    } else if (this.isBoolean(object)) {
      if (config.booleansAsIntegers) {
        formData.append(key, object ? '1' : '0');
      } else {
        formData.append(key, object);
      }
    } else if (this.isArray(object)) {
      if (object.length) {
        object.forEach((value: any, index: number) => {
          const porpertyKey = key + (config.indices ? '[' + index + ']' : '');
          this.serialize(value, config, formData, porpertyKey);
        });
      } else if (config.allowEmptyArrays) {
        formData.append(key + (config.indices ? '[]' : ''), '');
      }
    } else if (this.isDate(object)) {
      formData.append(key, object.toISOString());
    } else if (this.isObject(object) && !this.isFile(object) && !this.isBlob(object)) {
      Object.keys(object).forEach(prop => {
        const value = object[prop];

        if (this.isArray(value)) {
          while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
            prop = prop.substring(0, prop.length - 2);
          }
        }

        const porpertyKey = key ? key + '.' + prop : prop;

        this.serialize(value, config, formData, porpertyKey);
      });
    } else {
      formData.append(key, object);
    }

    return formData;
  };
}

export default new FormDataSerializer();
