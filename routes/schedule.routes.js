const express = require('express');
const controller = require('../controllers/schedule.controller');
const {isAuth} = require('../middlewares/auth.middlewares');

const router = express.Router();

router.get('/', [isAuth], controller.indexGet);

router.post('/create', [isAuth], controller.createPost);

router.put('/add', controller.addPost);

module.exports = router;