const pool = require('../data/db');

const Todo = {
    getAllTodos: async (user_id) => {
        const res = pool.query(`SELECT * FROM public."todos" WHERE user_id=$1 ORDER BY id ASC`, [user_id]);
        return (await res).rows;
    },
    removeTodo: async (id) => {
        const res = pool.query(`DELETE FROM public."todos" WHERE id=$1`, [id]);
        return (await res).rows;
    }
}