import Documents from '../model/documentModel.js';


export const addDocument = async (req, res) => {
    try {
        const {
            application_id,
            requirement_id
        } = req.params;

        const {
            version,
            po_compliance
        } = req.body || {};

        const file_url = req.file ? req.file.path : null;
        
        if (!application_id || !requirement_id) {
            return res.status(400).json({
                message: "Application and Requirement IDs are required!"
            });
        }

        const data = {
            application_id,
            requirement_id,
            file_url,
            version: version || 1,
            po_compliance: po_compliance || 'pending',
        };

        const result = await Documents.createDocument(data);
        
        res.status(201).json({message: "Program created successfully!", file_url});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const editDocumentFileUpload = async (req, res) => {
    try {
        const {
            application_id,
            requirement_id
        } = req.params;
        
        const file_url = req.file ? req.file.path : null;

        if (!application_id || !requirement_id) {
            return res.status(400).json({
                message: "Application ID are Required"
            });
        }

        const data = {
            application_id,
            requirement_id,
            file_url
        };

        const result = await Documents.updateDocumentFileUpload(data)
        return res.status(201).json({message: "Program created successfully!", file_url});
    } catch (err) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    };
};

export const editDocumentPOCompliance = async (req, res) => {
    try {
        const {
            application_id,
            requirement_id
        } = req.params;

        const {
            po_compliance
        } = req.body;

        if (!application_id || !requirement_id) {
            return res.status(400).json({
                message: "Application ID are Required"
            });  
        }

        const data = {
            po_compliance,
            application_id,
            requirement_id
        };

        const result = await Documents.updateDocumentPOCompliance(data);
        return res.status(201).json({message: "Program created successfully!"});
    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    };
}





export const getDocumentByApplicationID = async (req, res) => {

    try {
        const {
            application_id,
            program_id
        } = req.params;

        if (!application_id || !program_id) {
            return res.status(400).json({
                message: "Application ID and Program ID are Required"
            });
        }

        const data = await Documents.readDocumentByApplication(application_id, program_id);
        res.status(200).json(data);
    } catch (error) {
        console.error("SERVER ERROR", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export default { getDocumentByApplicationID, addDocument, editDocumentFileUpload }