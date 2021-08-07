const passport = require("passport");

const registerGet = (req, res) => {
  return res.redirect("./auth/register");
};

const registerPost = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.login(user, (error) => (error ? next(error) : res.json(user)));
  };

  passport.authenticate("register", done)(req);
};

const loginGet = (req, res, next) => {
  return res.redirect("./auth/login");
};

const loginPost = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.login(user, (error) => (error ? next(error) : res.redirect("/")));
  };

  passport.authenticate("login", done)(req);
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
  logoutPost
};
