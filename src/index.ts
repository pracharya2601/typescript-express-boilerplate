import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';

import './controllers/LoginController';
import './controllers/RootController';
const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['slkdjlskdjfsd'] }))

app.use(AppRouter.getInstance());

app.listen(PORT, (): void => {
  console.log(`App running on port ${PORT}`)
})