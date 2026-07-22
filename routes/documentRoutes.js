import express from 'express';
const router = express.Router();
import { getDocumentByApplicationID, addDocument, editDocumentFileUpload } from '../controller/documentController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadFile.js';


router.get('/documents/:application_id/:program_id', auth, getDocumentByApplicationID); //
router.post('/documents/create/:application_id/:requirement_id', upload.single('file'), auth, addDocument); //
router.put('/documents/update/:application_id/:requirement_id', upload.single('file'), auth, editDocumentFileUpload); //


export default router;