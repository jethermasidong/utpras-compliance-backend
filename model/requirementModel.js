import db from "../config/db.js";



const Requirement = {

    createRequirements: async (data) => {
        const query = `INSERT INTO requirements 
        (program_id, title, display_order, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.program_id,
            data.title,
            data.display_order,
            data.description,
        ]);

        return result.rows[0];
    },

    readRequirements: async (program_id) => {
        const query = `SELECT * FROM requirements WHERE program_id = $1`;
        const result = await db.query(query, [
            program_id
        ]);
        return result.rows;
    },

    readAllRequirements: async () => {
        const query = `SELECT * FROM requirements`;
        const result = await db.query(query);
        return result.rows;
    },

    updateRequirements: async (data) => {
        const query = `
        UPDATE requirements SET
            title = $1,
            display_order = $2,
            description = $3
        WHERE id = $4
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.title,
            data.display_order,
            data.description,
            data.id
        ]);

        return result.rows[0];
    },

};

export default Requirement;