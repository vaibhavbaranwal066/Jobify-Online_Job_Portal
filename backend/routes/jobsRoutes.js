import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, getAllJobsController } from '../controllers/jobsController.js';

const router = express.Router();

// Create Job || POST
router.post('/create-job', userAuth, createJobController);

// Get Jobs || GET
router.get('/get-jobs', userAuth, getAllJobsController);

export default router;