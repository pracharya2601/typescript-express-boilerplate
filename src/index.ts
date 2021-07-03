import express from 'express';
import path from 'path';
import { urlencoded } from 'body-parser';
import cookieSession from 'cookie-session';
import expressEjsLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';

import { AppRouter } from './AppRouter';

import './controllers/LoginController';
import './controllers/RootController';
import './controllers/ThemeController';
const app = express();
const PORT = 4000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set('layout', 'layouts/layout');
app.use(expressEjsLayouts);
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'assets')))


app.use(urlencoded({ limit: '10mb', extended: false }))
app.use(cookieSession({ keys: ['slkdjlskdjfsd'] }))

app.use(AppRouter.getInstance());

app.listen(PORT, (): void => {
  console.log(`App running on port ${PORT}`)
})