const express = require('express');
const Todo = require('../models/Todo.model');
const Meeting = require('../models/Meeting.model');
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

router.get('/save-todo', async (req, res, next) => {

    try {
        const newTodo = new Todo({

            name: 'Node project',
            date: '18/08/2021',
            message: 'Aprender Node JS creando un servidor yo solito',
            done: false
        });
    
        const todo = await newTodo.save();

        console.log(todo);
    
        return res.json(todo);

    } catch (error) {
        console.log('error ', error);
    }
    
});

router.get('/save-meeting', async (req, res, next) => {

    try {
        const newMeeting = new Meeting({

            name: 'job interview',
            date: '-',
            message: 'Estar preparado',
            done: false
        });
    
        const meeting = await newMeeting.save();
    
        return res.json(meeting);

    } catch (error) {
        console.log('error ', error);
    }
    
});

module.exports = router;