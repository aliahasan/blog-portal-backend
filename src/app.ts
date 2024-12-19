import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import handleGlobalError from './app/middlewares/globalError';
import handleNotFoundRoute from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to blog portal api' });
});

app.use(handleNotFoundRoute);
app.use(handleGlobalError);
export default app;
