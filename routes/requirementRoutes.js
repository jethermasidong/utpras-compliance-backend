import express from 'express';
const router = express.Router();
import { viewAllRequirements, addRequirements, editRequirements, viewRequirements} from '../controller/requirementController.js';
import auth from '../middleware/authMiddleware.js';


router.get('/requirements', auth, viewAllRequirements);
router.get('/requirement/:program_id', viewRequirements);
router.post('/requirements-create', auth, addRequirements);
router.put('/requirements-update', auth, editRequirements);


export default router;