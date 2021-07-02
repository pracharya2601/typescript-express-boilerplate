import { NextFunction, Request, Response } from 'express';
import { controller, get, bodyValidator, use, post } from './decorator';

function logger(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  next()
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="text"/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>

        <button type="submit">Submit</button>
      </form>
    `)
  }
  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email && password && email === 'email@email.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/')
    } else {
      res.send('Invalid email and password')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}