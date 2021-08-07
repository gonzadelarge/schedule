const isAuth = (req, res, next) => req.isAuthenticated()
    ? next() 
    : res.status(401).json('[Código rojo!] No estás autorizado');

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.user.role === "admin") {
            return next();
        }
        return res.status(403).json('No tienes permisos');
    } else {
        return res.status(401).json('[Código rojo!] No estás autorizado');
    };
};

module.exports = { isAuth, isAdmin };