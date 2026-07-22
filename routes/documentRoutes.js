import express from 'express';
const router = express.Router();
import { getDocumentByApplicationID, addDocument } from '../controller/documentController.js';
import auth from '../middleware/authMiddleware.js';


router.get('/documents/:application_id/:program_id', auth, getDocumentByApplicationID); //
router.post('/documents/create/:application_id/:requirement_id', auth, addDocument);

export default router;