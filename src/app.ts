import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { AuthRouter } from './routes/auth.route';
import { UserRouter } from './routes/user.route';
import { JobPostingRouter } from './routes/jobPosting.route';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const app: Application = express();

// security middlewares
app.use(helmet());
app.use(mongoSanitize());

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes middlewares
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/job-posted', JobPostingRouter);
// Global error handler
app.use(globalErrorHandler);

// Test route
app.get('/', (req, res) => {
  res.send('<h1>Working job portal backend</h1>');
});

export default app;
