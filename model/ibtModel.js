import db from '../config/db.js';

const IBT = {

    createProfile: async (data) => {

        const query = `INSERT INTO ibt_profile
        (application_id, applicant_name, address, telephone, program_applied, duration, no_of_trainees, no_of_batches, training_capacity)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.application_id,
            data.applicant_name,
            data.address,
            data.telephone,
            data.program_applied,
            data.duration,
            data.no_of_trainees,
            data.no_of_batches,
            data.training_capacity
        ]);

        return result.rows[0];
    },

    readProfileByApplicationID: async (application_id) => {
        const query = `SELECT * FROM ibt_profile WHERE application_id = $1`;
        const result = await db.query(query, [
            application_id
        ]);
        return result.rows;
    },

    readProfileByUserID: async (user_id) => {
        const query = `SELECT * FROM ibt_profile WHERE user_id = $1`;
        const result = await db.query(query, [
            user_id
        ]);
        return result.rows;
    },

    updateProfile: async (application_id, data) => {
        const query = `
        UPDATE ibt_profile SET
            applicant_name = $1,
            address = $2,
            telephone = $3,
            program_applied = $4,
            duration = $5,
            no_of_trainees = $6,
            no_of_batches = $7,
            training_capacity = $8
        WHERE application_id = $9
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.applicant_name,
            data.address,
            data.telephone,
            data.program_applied,
            data.duration,
            data.no_of_trainees,
            data.no_of_batches,
            data.training_capacity,
            application_id
        ]);

        return result.rows[0];
    },
};

export default IBT;