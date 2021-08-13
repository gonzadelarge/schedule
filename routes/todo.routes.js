const express = require('express');
const {isAuth} = require('../middlewares/auth.middlewares');
const controller = require('../controllers/todos.controller');

const router = express.Router();

router.get('/', controller.indexGet);

router.get('/todo/:id', controller.oneGet);

router.get('/:name', controller.nameGet);

router.post('/create', controller.createPost);

router.put('/edit', controller.editPost);

router.delete('/delete/:id', controller.deletePost);

module.exports = router;