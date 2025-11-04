const pool = require('../data/db');

const Todo = {
    getAllTodos: async (user_id) => {
        try {
            if (user_id === undefined || user_id === null) {
                throw new Error("user_id is undefined or null");
            }

            const result = await pool.query(
                `SELECT * FROM public."todos" WHERE user_id=$1 ORDER BY todo_id ASC`,
                [user_id]
            );

            return result.rows;
        } catch (err) {
            console.error(`Error in getAllTodos (Model): ${err.message}`);
            throw err;
        }
    },
    getTodoById: async (todo_id) => {
        try {
            const res = await pool.query(`SELECT * FROM public."todos" WHERE todo_id=$1`, [todo_id]);
            return (await res).rows[0];
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    },
    removeTodo: async (todo_id) => { // soft delete
        try {
            const res = await pool.query(`UPDATE public."todos" SET "isActive"=false WHERE todo_id=$1`, [todo_id]);
            return res;
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    },
    insertTodo: async ({ user_id, title, description, status, priority, due_date, list }) => {
        try {
            const res = await pool.query(
                `INSERT INTO public."todos" 
                (user_id, title, description, status, priority, due_date, list)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;`,
                [user_id, title, description, status, priority, due_date, list]
            );

            return res.rows[0];
        } catch (err) {
            console.error(`Error adding todo: ${err}`);
            throw err;
        }
    },
    getAllLists: async (user_id) => {
        try {
            const result = await pool.query(`
                SELECT ARRAY_AGG(DISTINCT list) AS lists
                FROM public."todos"
                WHERE user_id = $1 AND "isActive"=true
            `, [user_id]);

            const lists = result.rows[0].lists;
            return lists;
        } catch (err) {
            console.error(`Error getting list: ${err}`);
            throw err;
        }
    },
    getTodosByList: async (user_id, list) => {
        try {
            let result;
            if (list === 'allTodos') {
                result = await pool.query(`SELECT * FROM public."todos" WHERE user_id=$1`, [user_id]);
            } else {
                result = await pool.query(`SELECT * FROM public."todos" WHERE user_id=$1 AND list=$2`, [user_id, list]);
            }

            return result.rows;
        } catch (err) {
            console.error(`Error while getting todos. Error: ${err}`);
            throw err;
        }
    },
    updateTodo: async (todo_id, user_id, title, description, priority, due_date, list) => {
        try {
            const now = new Date();
            const result = await pool.query(`UPDATE public."todos"
            SET title = $1,
                description = $2,
                priority = $3,
                due_date = $4,
                updated_at = $5,
                list = $6
            WHERE todo_id = $7
            AND user_id = $8;`, [title, description, priority, due_date, now, list, todo_id, user_id]);

            return result.rows;
        } catch (err) {
            console.log(`Error by model. ${err}`);
            throw err;
        }
    }
}

module.exports = Todo;