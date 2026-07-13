import Program from '../model/programModel.js';


export const addProgram = async (req, res) => {
    try {
        const {
            program_name,
            description,
        } = req.body;

        if (!program_name || !description) {
            return res.status(400).json({
                message: "All data are required!"
            });
        }

        const data = {
            program_name,
            description,
        };

        const result = await Program.createProgram(data);

        res.status(201).json({message: "Program created successfully"});
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const editProgram = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            program_name,
            description,
        } = req.body;

        if (!program_name || !description) {
            return res.status(400).json({
                message: "All data are required!"
            });
        }

        const data = {
            id,
            program_name,
            description,
        };

        const result = await Program.updateProgram(data);

        req.status(200).json({message: "Program updated successfully"});
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


export const viewAllPrograms = async (req, res) => {
    try {
        const programs = await Program.readAllPrograms();
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { addProgram, viewAllPrograms, editProgram };