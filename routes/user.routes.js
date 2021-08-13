const express = require('express');
const controller = require('../controllers/user.controller');
const {isAuth} = require('../middlewares/auth.middlewares');

const router = express.Router();

router.get('/', controller.indexGet);

router.get('/user/:id', controller.userGet);

router.put('/edit', controller.editPost);

router.delete('/delete/:id', controller.deletePost);

module.exports = router; 