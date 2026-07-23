import AdditionalRequirement from "../model/additionalRequirementModel.js";

export const addAdditionalRequirements = async (req, res) => {
    try {

        const {
            program_id,
            title,
            display_order,
            description
        } = req.body;

        if (!program_id || !title || !display_order) {
            return res.status(400).json({
                message: "Program ID, Title, and Display Order are Required"
            });
        };

        const final_description = description || '';

        const data = {
            program_id,
            title,
            display_order,
            description: final_description
        };

        const result = await AdditionalRequirement.createAdditionalRequirements(data);

        res.status(201).json({message: "Requirement created successfully"});

    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const editAdditionalRequirements = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            title,
            display_order,
            description
        } = req.body;

        const data = {
            id,
            title,
            display_order,
            description
        };

        const result = await AdditionalRequirement.updateAdditionalRequirements(data);

        res.status(200).json({message: "Requirement updated successfully"});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const viewAdditionalRequirements = async (req, res) => {
    try {
        const { program_id } = req.params;
        const requirement = await AdditionalRequirement.readAdditionalRequirements(program_id);
        res.status(200).json(requirement);
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export default {addAdditionalRequirements, editAdditionalRequirements, viewAdditionalRequirements};