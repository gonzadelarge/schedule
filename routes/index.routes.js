const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    return res.status(200).json("Ruta de inicio");
});

router.get('/save-user', (req, res, next) => {

    const newUser = new User({
        name: 'Juan Macias',
        password: '1234asdf',
        email: 'juan@hub.com',
    });

    newUser.save();

    return res.sendStatus(201)
    
});

module.exports = router;