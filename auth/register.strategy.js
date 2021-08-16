const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { isValidEmail, isValidPassword, throwError } = require("./utils");

const registerStrategy = new LocalStrategy(

  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },

  async (req, email, pass, done) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
       return next(400, 'El usuario ya existe', done);
    }

    if (!isValidEmail(email)) return throwError(400, 'Email inváido', done);

    if (!isValidPassword(pass)) return throwError(400, 'Contraseña debe contener 8 characteres, 1 mayúscula y 1 minúscula', done);

    const saltRounds = 10;
    const hash = await bcrypt.hash(pass, saltRounds);

    const newUser = new User({
        email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        nick: req.body.nick,
    });

    const user = await newUser.save();
    user.password = null;
    return done(null, user);
  }
);

module.exports = registerStrategy;
