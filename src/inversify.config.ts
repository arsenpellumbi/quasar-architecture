/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { Container, interfaces, decorate, injectable } from 'inversify';

const container = new Container();

export { container };

/**
 * Decorator to provide dependencies
 * @param id optional id, could be auto generated with prop name
 */
export function provide<T>(
  serviceIdentifier?: interfaces.ServiceIdentifier<T>,
  singletonInstance = false,
  bind = true
) {
  return function (target: new (...args: any[]) => any) {
    const id = serviceIdentifier || target.name;
    try {
      decorate(injectable(), target);
    } catch (e) {
      throw new Error(
        'Cannot apply @provide decorator multiple times but is has been used ' + `multiple times in ${target.name} `
      );
    }

    if (bind) {
      if (singletonInstance) {
        container.bind<T>(id).to(target).inSingletonScope();
      } else {
        container.bind<T>(id).to(target);
      }
    }

    return target;
  };
}

/**
 * Decorator to inject dependencies as properties in components or classes
 * @param id optional id, could be auto generated with prop name
 */
export function lazyInject<T>(serviceIdentifier?: interfaces.ServiceIdentifier<T>) {
  return <V extends object>(target: V, key: string) => {
    const id = serviceIdentifier || key;

    const getter = () => {
      return container.get<T>(id);
    };

    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      get: getter,
    });
  };
}
