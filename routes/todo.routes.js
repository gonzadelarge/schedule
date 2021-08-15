const express = require('express');
const {isAuth} = require('../middlewares/auth.middlewares');
const controller = require('../controllers/todos.controller');

const router = express.Router();

router.get('/', controller.indexGet);

router.get('/todo/:id', controller.oneGet);

router.get('/create', controller.createGet);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.editGet);

router.put('/edit', controller.editPost);

router.delete('/todo/delete/:id', controller.deletePost);

// router.get('/filter/:name', controller.nameGet);

module.exports = router;