import { NextFunction, Request, Response } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("You are not permitted")
}

export function blockpath(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  next()
}
