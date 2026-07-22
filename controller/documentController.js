import Documents from '../model/documentModel.js';


export const addDocument = async (req, res) => {
    try {
        const {
            application_id,
            requirement_id
        } = req.params;

        const {
            file_url,
            version,
            po_compliance
        } = req.body;
        
        if (!application_id || !requirement_id) {
            return res.status(400).json({
                message: "All data are required!"
            });
        }

        const data = {
            application_id,
            requirement_id,
            file_url,
            version,
            po_compliance,
        };

        const result = await Documents.createDocument(data);
        
        res.status(201).json({message: "Program created successfully!"});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};





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


export default { getDocumentByApplicationID }