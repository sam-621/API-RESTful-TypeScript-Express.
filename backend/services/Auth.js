const { Create, GetOne } = require('../lib/MySQL');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_key } = require('../config');


const AuthServices = {

    async Register(userData, cb) {

        const { firstName, lastName, email, username, password } = userData;
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        }

        Create('Users', newUser, (err) => {
            err ? cb(err, err.message) : cb(err, 'You have been registered succesfully')
        })
    },

    Login({ email, password }, cb) {

        GetOne('Users', 'email', email, async (err, user) => {
            if(err) {
                cb(err, null, null)
                return
            }
            if(user.length) {
                if(await bcryptjs.compare(password, user[0].password)) {
                    const payload = {
                        id: user[0].ID,
                        rol: user[0].rol
                    }
                    jwt.sign(payload, secret_key /*{ expiresIn: }*/, (err, token) => {
                        if(err) {
                            cb(err, null, 'Server error')
                            return
                        }
                        cb(false, token, 'success');
                    });
                    
                } else {
                    cb(true, null, 'Wrond credentials');
                }
            } else {
                cb(true, null, 'wrong credentials');
            }
        });
    }
}

module.exports = AuthServices;