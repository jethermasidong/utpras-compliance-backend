import Documents from '../model/documentModel.js';


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