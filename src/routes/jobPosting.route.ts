import express from 'express';
import verifyJwt from '../middlewares/verifyJwt';
import { JobPostingController } from '../controllers/postedJob.controller';

const router = express.Router();

router.post('/create-job', verifyJwt, JobPostingController.createJob);
router.get('/get-jobs', verifyJwt, JobPostingController.getAllJobs);

export const JobPostingRouter = router;
