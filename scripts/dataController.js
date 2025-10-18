const pool = require('../data/db');

exports.checkUsername = async (username) => {
    const isUsernameTaken = await pool.query(`SELECT EXISTS ( SELECT 1 FROM public."users" WHERE username=$1)`, [username]);
    
    if (isUsernameTaken.rows[0].exists) return true;
    else return false;
}

exports.checkEmail = async (email) => {
    const isEmailTaken = await pool.query(`SELECT EXISTS ( SELECT 1 FROM public."users" WHERE email=$1)`, [email]);

    if (isEmailTaken.rows[0].exists) return true;
    else return false;
}
