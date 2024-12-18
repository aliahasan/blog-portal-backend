import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to blog portal api' });
});

export default app;
