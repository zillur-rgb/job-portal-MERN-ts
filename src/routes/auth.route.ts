import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import rateLimit from 'express-rate-limit';

// ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

router.post('/create-user', limiter, AuthController.createUser);
router.post('/login-user', limiter, AuthController.loginUser);

export const AuthRouter = router;
