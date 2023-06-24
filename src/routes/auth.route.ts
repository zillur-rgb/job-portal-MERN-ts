import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/create-user', AuthController.createUser);

export const AuthRouter = router;
