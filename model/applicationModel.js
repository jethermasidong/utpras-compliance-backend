import db from '../config/db.js';

const Application = {

    createApplication: async (data) => {
        const query = `INSERT INTO program 
        (user_id, program_id, status)
        VALUES ($1, $2, 'pending')
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.user_id, 
            data.program_id,
            data.status,
        ]);
        
        return result.rows[0];
    },

    readApplications: async (user_id) => {
        const query = `SELECT * FROM applications WHERE user_id = $1`;
        const result = await db.query(query, [
            user_id
        ]);
        return result.rows;
    },

    readAllApplications: async () => {
        const query = `SELECT * FROM applications`;
        const result = await db.query(query);
        return result.rows;
    },

    updateApplications: async (data) => {
        const query = `
        UPDATE applications SET
            status = $1
        WHERE id = $2
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.status,
        ]);

        return result.rows[0];
    },

};

export default Application;