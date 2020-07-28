const { Create, GetOne } = require('../lib/MySQL');
const bcryptjs = require('bcryptjs');


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

    Login() {

    }
}

module.exports = AuthServices;