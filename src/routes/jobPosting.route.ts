import express from 'express';
import verifyJwt from '../middlewares/verifyJwt';
import { JobPostingController } from '../controllers/postedJob.controller';

const router = express.Router();

router.patch(
  '/update-job/:id',
  verifyJwt,
  JobPostingController.updateJobPosting,
);
router.delete(
  '/delete-job/:id',
  verifyJwt,
  JobPostingController.deleteJobPosting,
);
router.post('/create-job', verifyJwt, JobPostingController.createJob);
router.get('/get-jobs', verifyJwt, JobPostingController.getAllJobs);
router.get('/jobs-stats', verifyJwt, JobPostingController.statsJobPosting);

export const JobPostingRouter = router;
