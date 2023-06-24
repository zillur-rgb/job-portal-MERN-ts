import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes middlewares

// Global error handler
app.use(globalErrorHandler);

// Test route
app.get('/', (req, res) => {
  res.send('<h1>Working job portal backend</h1>');
});

export default app;
