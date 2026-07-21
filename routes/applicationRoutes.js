import express from 'express';
const router = express.Router();
import { viewAllApplications, addApplications, editApplications, viewApplicationsByUser, deleteApplication} from '../controller/applicationController.js';
import auth from '../middleware/authMiddleware.js';


router.get('/applications', auth, viewAllApplications);
router.get('/application', auth, viewApplicationsByUser); //
router.post('/applications-create', auth, addApplications); //
router.put('/applications-update/:id', auth, editApplications);
router.delete('/applications-delete/:id', auth, deleteApplication); //


export default router;