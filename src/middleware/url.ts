import { NextFunction, Request, Response } from 'express';
export function url(req: Request, res: Response, next: NextFunction) {
  req.session = {
    ...req.session,
    lastUrl: req.session && req.session.thisUrl,
    thisUrl: req.url
  }
  next();
  return;
}