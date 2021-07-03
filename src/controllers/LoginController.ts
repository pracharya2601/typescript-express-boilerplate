import { Request, Response } from 'express';
import { controller, get, bodyValidator, use, post } from './decorator';

import { url, blockpath } from '../middleware';
import { sendResponse } from './responseHandeler/response';



@controller('/auth')
class LoginController {
  @get('/login')
  @use(url)
  @use(blockpath)
  getLogin(req: Request, res: Response): void {
    console.log(req.query.error)
    return sendResponse(
      req,
      res,
      "auth/index",
      "Login | Express Typescript Boilerplate",
      {
        error: req.query.error
      }
    )
  }
  @post('/login')
  @use(url)
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email && password && email === 'email@email.com' && password === 'password') {
      req.session = { ...req.session, loggedIn: true, user: "user" };
      res.redirect('/')
    } else {
      return sendResponse(
        req,
        res,
        "auth/index",
        "Login | Express Typescript Boilerplate",
        {
          error: "Invalid email or password"
        }
      )
    }
  }

  @get('/logout')
  @use(url)
  getLogout(req: Request, res: Response): void {
    req.session = {
      ...req.session,
      loggedIn: false,
      user: undefined,
    }
    res.redirect('/');
  }
}