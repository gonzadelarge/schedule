const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {

    const message = 'Bienvenidos a la Agenda App';
    
    return res.render('index', { title: 'Node - Project', message, isAuthenticated: req.isAuthenticated(), user: req.user });
});




module.exports = router;