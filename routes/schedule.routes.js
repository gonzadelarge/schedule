const express = require('express');
const controller = require('../controllers/schedule.controller');
const {isAuth} = require('../middlewares/auth.middlewares');

const router = express.Router();


router.post('/create', [isAuth], controller.createPost);

router.put('/add', [isAuth], controller.addPost);

router.get('/:id', [isAuth], controller.indexGet);

module.exports = router;