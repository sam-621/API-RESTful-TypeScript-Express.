const pool = require('../database/connection');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_key } = require('../config');


const AuthServices = {

    async Register(userData) {

        try {
            const { firstName, lastName, email, username, password } = userData;
            const hashedPassword = await bcryptjs.hash(password, 10);

            const newUser = {
                firstName,
                lastName,
                email,
                username,
                password: hashedPassword
            }

            await pool.query("INSERT INTO Users SET ?", [newUser]);

            return {
                error: null,
                message: 'You have been registered succesfully'
            }

        } catch (err) {
            return {
                error: err,
                message: 'An error has occurred'
            }
        }
    },

    async Login({ email, password }) {

        try {
            const [user] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);

            if(!user.length) {
                throw { error: true, token: null, message: 'no user founded' };
            }

            if(! await bcryptjs.compare(password, user[0].password)) {
                throw { error: true, token: null, message: 'password doesnt match'}
            }

            const payload = {
                id: user[0].ID,
                rol: user[0].rol
            }

            const token = jwt.sign(payload, secret_key /*{ expiresIn: }*/);

            return {
                error: false,
                token: token,
                message: 'success'
            }

        } catch (err) {
            return err
        }
    }
}

module.exports = AuthServices;