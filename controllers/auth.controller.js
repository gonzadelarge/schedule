const passport = require('passport');

const registerGet = (req, res, next) => {

    return res.render("./auth/register");
}

const registerPost = async (req, res, next) => {

    const done = ( error, user) =>{

            if (error) return next(error);
        
            req.login(user, (error) => (error ? next(error) : res.redirect(`/schedule/${user.id}`)));
        
    }

    passport.authenticate("register",done)(req);
}

const loginGet = (req, res, next) =>{
    return res.render("./auth/login");
}

const loginPost = (req, res, next) =>{
    const done = ( error, user) =>{
        if(error){
            return next(error);
        }
        req.logIn(user, (error)=>{

            if(error){
                return next(error);
            }
            console.log("Usuario logueado con exito", user);
            return res.redirect(`/schedule/${user.id}`);
        })
        
    };
    passport.authenticate("access", done)(req);
}

const logoutPost = (req, res, next) =>{
    console.log("dentro de logout");
    if(req.user){
    req.logout();
    req.session.destroy(() =>{
        res.clearCookie("connect.sid");
        return res.redirect("/");
    });
}
}
module.exports = {registerGet, registerPost, loginGet, loginPost, logoutPost };