import db from '../config/db.js';

const User = {

    
    createUsers: async (data) => {
        
        const query = `INSERT INTO users
        (role, province, email, password) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;

        const result = await db.query(query, [
           data.role,
           data.province,
           data.email,
           data.password, 
        ]);
        return result.rows[0];
    },

    readUsers: async (email) => {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await db.query(query, [
            email
        ]);
        return result.rows[0];
    },

    readAllUsers: async () => {
        const query = `SELECT * FROM users`;
        const result = await db.query(query);
        return result.rows;
    },

    updateUsers: async (data) => {
        const query = `
        UPDATE users SET
            role = $1,
            province = $2,
            email = $3,
            password = $4
        WHERE id = $5
        RETURNING *;
        `;

        const result = await db.query(query, [
            data.role,
            data.province,
            data.email,
            data.password,
            data.id
        ]);
        return result.rows[0];
    },

    deleteUsers: async (id) => {
        const query = `
        DELETE FROM users 
        WHERE id = $1 
        RETURNING *; 
        `;
        const result = await db.query(query, [id]);
        return result.rows[0];
    },

};



export default User;