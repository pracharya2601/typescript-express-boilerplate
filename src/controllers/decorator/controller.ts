import 'reflect-metadata';

import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';


function bodyValidates(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.send(422).send("Invalid Request");
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`${key} is required`);
        return
      }
    }
    next();
  }
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandeler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requiredBodyProperties = Reflect.getMetadata(MetadataKeys.bodyValidator, target.prototype, key) || [];
      const validator = bodyValidates(requiredBodyProperties);
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandeler);
      }
    }
  }
}