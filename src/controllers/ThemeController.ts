import { Request, Response } from "express";
import { controller, get } from "./decorator";


@controller('/theme')
class ThemeController {
  @get('/:themeName')
  changeTheme(req: Request, res: Response) {
    const goBackTo = req.session && req.session.lastUrl;
    req.session = {
      ...req.session,
      theme: req.params.themeName

    }
    res.redirect(goBackTo);
  }
}