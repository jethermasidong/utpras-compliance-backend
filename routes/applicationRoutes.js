import express from 'express';
const router = express.Router();
import { viewAllApplications, addApplications, editApplications, viewApplicationsByUser} from '../controller/applicationController.js';
import auth from '../middleware/authMiddleware.js';


router.get('/applications', auth, viewAllApplications);
router.get('applications/:user_id', auth, viewApplicationsByUser);
router.post('/applications-create', auth, addApplications);
router.put('/applications-update', auth, editApplications);


export default router;