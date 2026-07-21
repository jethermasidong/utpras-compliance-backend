import Application from '../model/applicationModel.js';


export const addApplications = async (req, res) => {
    try {

        const user_id = req.user.id;
        const {
            program_id,
        } = req.body;

        if (!user_id || !program_id) {
            return res.status(400).json({
                message: "User ID and Program ID are Required"
            });
        };

        const data = {
            user_id,
            program_id
        };

        const result = await Application.createApplication(data);

        res.status(201).json(result);

    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


export const editApplications = async (req, res) => {
    try {
        
        const { id } = req.params;

        const { status } = req.body;

        const data = {
            status
        };

        const result = await Application.updateApplications(data);

        res.status(200).json({message: "Application updated successfully"});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const viewApplicationsByUser = async (req, res) => {
    try {
        const user_id = req.user.id;
        const application = await Application.readApplications(user_id);
        res.status(200).json(application);

    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export const viewAllApplications = async (req, res) => {
    try {
        const applications = await Application.readAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.deleteApplication(id);
        res.status(200).json({ message: "Application deleted successfully!"});
    } catch (error) {
        console.error("SERVER ERROR", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export default { addApplications, editApplications, viewAllApplications, viewApplicationsByUser, deleteApplication};