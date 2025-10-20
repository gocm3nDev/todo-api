const pool = require('../../data/db');

// Check username and mail, if not exist in registered users return false
exports.checkUsername = async (username) => {
    const { rows } = await pool.query(
        `SELECT EXISTS (SELECT 1 FROM public."users" WHERE username=$1)`,
        [username]
    );
    return rows[0].exists;
}

exports.checkEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT EXISTS (SELECT 1 FROM public."users" WHERE email=$1)`,
        [email]
    );
    return rows[0].exists;
}