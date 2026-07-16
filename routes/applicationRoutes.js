import express from 'express';
const router = express.Router();
import { viewAllApplication, addApplications, editApplications, viewApplicationsByUser} from '../controller/applicationControler.js';
import auth from '../middleware/authMiddleware.js';


router.get('/applications', auth, viewAllApplication);
router.get('applications/:user_id', viewApplicationsByUser);
router.post('/applications-create', auth, addApplications);
router.put('/applications-update', auth, editApplications);


export default router;