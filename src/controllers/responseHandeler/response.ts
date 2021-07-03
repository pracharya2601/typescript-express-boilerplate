import { Request, Response } from 'express';

export function sendResponse(
  req: Request,
  res: Response,
  page: string,
  title?: string,
  data?: any, //change for better error handeling
) {
  const user = req.session && req.session.user || undefined;
  const loggedin = req.session && req.session.loggedIn;
  const pageTitle = title ? title : "Express Typescript Boilerplate";
  const description = "Page description for seo"
  const theme = req.session && req.session.theme ? req.session.theme : "light";
  return res.render(
    page,
    {
      data: {
        title: pageTitle,
        description: description,
        theme: theme,
        loggedin: loggedin,
        user: user,
        content: data
      }
    }
  )

}