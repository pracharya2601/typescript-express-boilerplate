import { Request, Response } from 'express';
import { controller, get, use } from './decorator';

import { url, auth } from '../middleware';
import { sendResponse } from './responseHandeler/response';


@controller('')
class RootController {
  @get('/')
  @use(url)
  getRoot(req: Request, res: Response): void {
    return sendResponse(
      req,
      res,
      "index",
      "Home | Express Typescript Boilerplate",
      {
        item: "Hello from / route"
      }
    )
  }

  @get('/protected')
  @use(auth)
  @use(url)
  getProtected(req: Request, res: Response): void {
    const theme = req.session && req.session.theme;
    res.render('protected/index', {
      layout: 'layouts/layout', title: 'This is new Title',
      theme: theme,
      content: "You are in protected route"
    })
  }

  @get('/:name')
  @use(url)
  getParams(req: Request, res: Response): void {
    sendResponse(
      req,
      res,
      "unprotected/index",
      "Login | Express Typescript Boilerplate",
      req.params.name,
    )
  }


}