import { NextFunction, Request, Response } from 'express';
import { controller, get, bodyValidator, use, post } from './decorator';


interface CustomRequest extends Request {
  user?: string,
}

enum IpType {
  en0 = 'en0',
  eth0 = 'eth0',
  networkname = '<networkname>'
}

function auth(req: CustomRequest, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("You are not permitted")
}




@controller('')
class RootController {
  @get('/')
  getRoot(req: CustomRequest, res: Response): void {
    const isHappy = req.query.happy ? "happy" : 'we dont know';
    const state = req.query.state ? req.query.state : 'fine';
    console.log(req.headers['user-agent'])
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <h2>You are logged as</h2>
          <h2>You are ${isHappy}</h2>
          <h2>You are ${state}</h2>
          <a href='?happy=true&state=good'>Get your mood</a>
          <br />
          <a href="/auth/logout">Logout</a>
        </div>
      `)
    } else {
      res.send(`
      <div>
        <h2>You are not logged in</h2>
        <h2>You are ${isHappy}</h2>
        <h2>You are ${state}</h2>
        <a href='?happy=true&state=good'>Get your mood</a>
        <br />
        <a href="/auth/login">Login</a>
      </div>
    `)
    }
  }

  @get('/protected')
  @use(auth)
  getProtected(req: CustomRequest, res: Response): void {

    res.send(`
      <div>
        <h1>You are on protected Routes</h1>
        <h2>You are logged in</h2>
      </div>
    `)
  }

  @get('/:name')
  getParams(req: CustomRequest, res: Response): void {
    const user = req.session && req.session.loggedIn;
    const text = user ? 'Logout' : 'Login';
    const path = user ? '/auth/logout' : '/auth/login';
    res.send(`
      <div>
        <h1>Hello ${req.params.name}</h1>
        <a href=${path}>${text}</a>
      </div>
    `)
  }


}