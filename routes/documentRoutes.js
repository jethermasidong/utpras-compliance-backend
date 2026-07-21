import express from 'express';
const router = express.Router();
import { getDocumentByApplicationID } from '../controller/documentController.js';
import auth from '../middleware/authMiddleware.js';


router.get('/documents/:application_id/:program_id', auth, getDocumentByApplicationID); //


export default router;