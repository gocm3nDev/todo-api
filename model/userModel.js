const pool = require('../data/db');

const User = {
    registerUser: async (username, email, password_hash) => {
        try {
            const res = pool.query(`INSERT INTO public."users" (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *`, [username, email, password_hash]);
            return (await res).rows;
        } catch (err) {
            console.log(`DB insertion error. Error: ${err}`);
        }
    },
    getUserByUsername: async (username) => {
        try {
            const res = await pool.query(`SELECT * FROM public."users" WHERE username=$1`, [username]);
            if (res.rows.length > 0) { return res.rows[0]; }
            else { return null; }
        } catch (err) {
            console.log(`DB indexing error. Error: ${err}`);
            throw err;
        }
    },
    getUserById: async (id) => {
        try {
            const res = await pool.query(`SELECT * FROM public."users" WHERE id=$1`, [id]);
            if (res.rows.length > 0) { return res.rows[0]; }
            else { return null; }
        } catch (err) {
            console.log(`DB indexing error. Error: ${err}`);
            throw err;
        }
    },
}

module.exports = User;