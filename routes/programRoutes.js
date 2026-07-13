import express from 'express';
const router = express.Router();
import { viewAllPrograms, editProgram, addProgram } from '../controller/programController.js';
import auth from '../middleware/authMiddleware.js';


router.get('/programs', auth,  viewAllPrograms);
router.post('/programs-create', auth, addProgram);
router.put('/programs-update', auth, editProgram);


export default router;