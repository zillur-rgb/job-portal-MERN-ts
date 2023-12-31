import express from 'express';
import { UserController } from '../controllers/user.controller';
import verifyJwt from '../middlewares/verifyJwt';

const router = express.Router();

router.post('/get-user', verifyJwt, UserController.getUser);
router.put('/update-user', verifyJwt, UserController.updateUser);

export const UserRouter = router;
