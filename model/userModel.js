const pool = require('../data/db');

const User = {
    registerUser: async (username, email, password_hash) => {
        try {
            
            
        } catch (err) {

        }

        
        const res = pool.query(`INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3) RETURNING *`, [username, email, password_hash]);
        return ( await res).rows;
    },
}