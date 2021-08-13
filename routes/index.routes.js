const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    return res.render('index', { isAuthenticated: req.isAuthenticated(), user: req.user });
});




module.exports = router;