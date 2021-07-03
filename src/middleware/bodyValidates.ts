import { NextFunction, RequestHandler, Request, Response } from 'express';

export function bodyValidates(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      const goBackTo = req.session && req.session.lastUrl;
      res.redirect(`${goBackTo}?error=${encodeURIComponent("Form need to be filled completely")}`)
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        const goBackTo = req.session && req.session.thisUrl;
        res.redirect(`${goBackTo}?error=${encodeURIComponent(`${key} is required`)}`)
        return
      }
    }
    next();
  }
}