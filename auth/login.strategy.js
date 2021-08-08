const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy(

    {
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true
    },

    async (req, email, pass, done) => {


        try {

            const existingUser = await User.findOne({ email });
            
            console.log(existingUser)

            if (!existingUser) next(400, 'El usuario no existe', done);

            const isValidPassword = await bcrypt.compare(pass, existingUser.password);

            if (!isValidPassword) next(401, 'Las contraseñas no coicniden', done);

            existingUser.password = undefined;
            return done(null, existingUser);
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;