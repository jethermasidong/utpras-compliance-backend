import express from 'express';
const router = express.Router();
import { addProfile, editIBTProfile, viewProfileByApplicationID, viewAllProfile } from '../controller/ibtController.js';
import auth from '../middleware/authMiddleware.js';

router.get('/ibt-profile', auth, viewAllProfile);
router.get('/ibt-profile/:application_id', auth, viewProfileByApplicationID);
router.post('/ibt-profile/create', auth, addProfile);
router.put('/ibt-profile/edit', auth, editIBTProfile);


export default router;