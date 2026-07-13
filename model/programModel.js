import db from '../config/db.js';

const Program = {

    createProgram: async (data) => {
    
        const query = `INSERT INTO program
        (program_name, description)
        VALUES ($1, $2)
        RETURNING *; 
        `;

        const result = await db.query(query, [
            data.program_name,
            data.description,
        ]);
        return result.rows[0];
    },

    readProgram: async (id) => {
        const query = `SELECT * FROM program WHERE id = $1`;
        const result =  await db.query(query, [
            id
        ]);
        return result.rows[0];
    },

    readAllPrograms: async (id) => {
        const query = `SELECT * FROM program`;
        const result = await db.query(query);
        return result.rows;
    },

    updateProgram: async (data) => {
        const query = `
        UPDATE program SET
            program_name = $1,
            description = $2
        WHERE id = $3
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.program,
            data.description
        ]);
        return result.rows[0];
    },


};

export default Program;