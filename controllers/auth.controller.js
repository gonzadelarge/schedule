const passport = require("passport");

const registerGet = (req, res) => {
  return res.render("./auth/register");
};

const registerPost = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.login(user, (error) => (error ? next(error) : res.json(user)));
  };

  passport.authenticate("register", done)(req);
  
  return res.redirect("/schedule");
};

const loginGet = (req, res, next) => {
  return res.render("./auth/login");
};

const loginPost = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.login(user, (error) => (error ? next(error) : res.redirect("/")));
  };

  passport.authenticate("login", done)(req);

  return res.redirect("/schedule");
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
