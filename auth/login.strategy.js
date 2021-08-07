const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const { throwError } = require('./utils');
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, pass, done) => {
        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) throwError(400, 'El usuario no existe', done);

            const isValidPassword = await bcrypt.compare(pass, existingUser.password);

            if (!isValidPassword) throwError(401, 'Las contraseñas no coicniden', done);

            existingUser.password = undefined;
            return done(null, existingUser);
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;