import Requirement from "../model/requirementModel.js";

export const addRequirements = async (req, res) => {
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

        const result = await Requirement.createRequirements(data);

        res.status(201).json({message: "Requirement created successfully"});

    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const editRequirements = async (req, res) => {
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

        const result = await Requirement.updateRequirements(data);

        res.status(200).json({message: "Requirement updated successfully"});
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const viewAllRequirements = async (req, res) => {
    try {
        const requirements = await Requirement.readAllRequirements();
        res.status(200).json(requirements);
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const viewRequirements = async (req, res) => {
    try {
        const { program_id } = req.params;
        const requirement = await Requirement.readRequirements(program_id);
        res.status(200).json(requirement);
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export default {addRequirements, editRequirements, viewAllRequirements, viewRequirements};