const passport = require("passport");

const registerGet = (req, res) => {
  return res.render("./auth/register");
};

const registerPost = async (req, res, next) => {
  console.log('Hola')
  const done = (error, user) => {
    console.log('Hola')
    if (error) {
      return next(error);
    }

    req.logIn(user, (error) => {

      console.log("Usuario registrado -> ", user);

      if (error) { 
        console.log('Error 1',error);
        return next(error);
      }
      console.log("Usuario registrado -> ", user);

      return res.redirect("/schedule");
    });
  };

  passport.authenticate("register-strategy", done)(req);
};

const loginGet = (req, res, next) => {
  return res.render("./auth/login");
};

const loginPost = (req, res, next) => {
  
  const done = (error, user) => {

    console.log("Usuario logueado -> ", user);
    
    if (error) {
      return next(error);
    }

    /**
     * Crea la sesión del usuario y la guarda en db.
     */
    req.logIn(user, (error) => {

      console.log("Usuario logueado -> ", user);

      if (error) {
        return next(error);
      }
      console.log("Usuario logueado -> ", user);

      return res.redirect("/schedule");
    });
  };

  /**
   * Intenta autenticar a un usuario según la estrategia
   */
  passport.authenticate("login-strategy", done)(req);
};

const logoutPost = (req, res, next) => {
  if (req.user) {
    req.logout();

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  }
};

module.exports = {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
};
