import 'reflect-metadata'
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler } from 'express';

interface RouteHandelerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeMethod(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandelerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    }
  }
}

export const get = routeMethod(Methods.get);
export const post = routeMethod(Methods.post);
export const put = routeMethod(Methods.put);
export const del = routeMethod(Methods.del);
export const patch = routeMethod(Methods.patch);

