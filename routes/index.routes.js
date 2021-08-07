const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

router.get('/', (req, res, next) => {

    return res.status(200).json("Ruta de inicio");
});

router.get('/save-user', async (req, res, next) => {

    try {
        const newUser = new User({
            name: 'Gonza DeLArge',
            password: 'Hola1234',
            email: 'gonza@hub.com',
        });
    
        const user = await newUser.save();

        console.log(user);
    
        return res.json(user);

    } catch (error) {
        console.log('error ', error);
    }
    
});

module.exports = router;