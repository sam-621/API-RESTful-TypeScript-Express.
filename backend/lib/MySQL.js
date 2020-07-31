const pool = require('../database/connection');

const MySQL = {
    
    async GetOne(table, condition, id) {
        try {
            const [row] = await pool.query(`SELECT * FROM ${table} WHERE ${condition} = ?`, [id],);
            const succesResponse = {
                data: row,
                message: succes
            }
            return succesResponse;

        } catch (error) {

            failureResponse = {
                error: error,
                message: 'An error has occurred'
            }
        }
    },

    async GetMany(table, callback) {
        try {
            const [rows] = await pool.query(`SELECT * FROM ${table}`);
            const successResponse = {
                data: rows,
                message: 'got it successfully'
            }
            return successResponse;
        } catch (error) {
            const errorResponse = {
                error: error,
                message: 'there was an error'
            }
            return errorResponse;
        }
    },

    Create(table, data, callback) {

        pool.query(`INSERT INTO ${table} SET ?`, [data], (err) => {
            if(err){
                return callback(err);
            }
            callback(null);
        })
    },

    Update(table, condition, data, id, callback) {
        pool.query(`UPDATE ${table} SET ? WHERE ${condition} = ?`, [data, id], (err, rowUpdated) => {
            if(err) {
                return callback(err, null);
            }
            callback(null, rowUpdated);
        });
    },

    Delete(table, condition, id, callback) {
        pool.query(`DELETE FROM ${table} WHERE ${condition} = ?`, [id], (err) => {
            if(err) {
                return callback(err, null);
            }
                callback(null);
        });
    }
}

module.exports = MySQL;