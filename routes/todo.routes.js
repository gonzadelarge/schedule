const express = require('express');
const {isAuth} = require('../middlewares/auth.middlewares');
const controller = require('../controllers/todos.controller');

const router = express.Router();

router.get('/', [isAuth], controller.indexGet);

router.post('/create', [isAuth], controller.createPost);

router.put('/edit', [isAuth], controller.editPost);

router.delete('/delete/:id', [isAuth], controller.deletePost);

module.exports = router;