import IBT from "../model/ibtModel.js";

export const addProfile = async (req, res) => {
    try {

        const {
            application_id,
            applicant_name,
            address,
            telephone,
            program_applied,
            duration,
            no_of_trainees,
            no_of_batches,
            training_capacity
        } = req.body;

        if (!application_id) {
            return res.status(400).json({
                message: "Application ID is Required"
            });
        };

        const data = {
            application_id,
            applicant_name,
            address,
            telephone,
            program_applied,
            duration,
            no_of_trainees,
            no_of_batches,
            training_capacity
        };

        const result = await IBT.createProfile(data);
        res.status(201).json({message: "Profile created successfully"});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const editIBTProfile = async (req, res) => {
    try {

        const { application_id } = req.params;

        const {
            applicant_name,
            address,
            telephone,
            program_applied,
            duration,
            no_of_trainees,
            no_of_batches,
            training_capacity
        } = req.body;

        const data = {
            applicant_name,
            address,
            telephone,
            program_applied,
            duration,
            no_of_trainees,
            no_of_batches,
            training_capacity
        };

        const result = await IBT.updateProfile(application_id, data);
        res.status(200).json({message: "Profile updated successfully!"});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


export const viewProfileByApplicationID = async (req, res) => {
    try {
        const { application_id } = req.params;
        const ibt_profile = await IBT.readProfileByApplicationID(application_id);
        res.status(200).json(ibt_profile);
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const viewProfileByUserID = async (req, res) => {
    try {
        const user_id = req.user.id;
        const ibt_profile = await IBT.readProfileByUserID(user_id);
        res.status(200).json(ibt_profile);
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export default { addProfile, editIBTProfile, viewProfileByApplicationID, viewProfileByUserID };
