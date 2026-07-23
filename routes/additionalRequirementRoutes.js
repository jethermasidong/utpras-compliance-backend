import express from 'express';
const router = express.Router();
import { addAdditionalRequirements, editAdditionalRequirements, viewAdditionalRequirements } from '../controller/additionalRequirementController.js';
import auth from '../middleware/authMiddleware.js';

router.get('/additional-requirement/:program_id', viewAdditionalRequirements); //    
router.post('/additional-requirements/create', auth, addAdditionalRequirements); //
router.put('/additional-requirements/update/:id', auth, editAdditionalRequirements); //


export default router;